import prisma from "@/lib/db";
import { getToken } from "@/lib/generateToken";
import { getPublicIdFromUrl } from "@/lib/GetImagePublicId";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/lib/UploadToCloudinary";
import { addProductSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = await getToken();
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 400 });
    }

    if (!shopId) {
      return NextResponse.json({ msg: "Shop ID is required" }, { status: 400 });
    }

    const parsedShopId = parseInt(shopId);
    if (isNaN(parsedShopId)) {
      return NextResponse.json({ msg: "Invalid Shop ID" }, { status: 400 });
    }

    const shop = await prisma.shop.findUnique({
      where: { id: parsedShopId, ownerId: id },
    });

    if (!shop) {
      return NextResponse.json({ msg: "No shop found" }, { status: 400 });
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceRaw = formData.get("price");
    const image = formData.get("image") as File | null;
    const productUrl = formData.get("productUrl") as string;

    if (!name || !description || !priceRaw || !productUrl) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );
    }

    const price = parseFloat(priceRaw as string);
    if (isNaN(price) || price < 0) {
      return NextResponse.json({ msg: "Invalid price value" }, { status: 400 });
    }

    const validatedData = addProductSchema.safeParse({
      name,
      description,
      price,
      image,
      productUrl,
    });

    if (!validatedData.success) {
      return NextResponse.json({ msg: "Invalid Inputs" }, { status: 400 });
    }

    let imageUrl: string = "";
    if (image) {
      imageUrl = (await uploadToCloudinary(image, "popply/product")) || "";
    }

    await prisma.product.create({
      data: {
        shopId: parsedShopId,
        name,
        description,
        price,
        image: imageUrl,
        productUrl,
      },
    });

    return NextResponse.json(
      { msg: "Product added successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("id");
  try {
    if (!productId) {
      return NextResponse.json({ msg: "No product ID" }, { status: 400 });
    }
    const parsedProductId = parseInt(productId);
    if (isNaN(parsedProductId)) {
      return NextResponse.json({ msg: "Invalid Product ID" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: parsedProductId,
      },
    });
    if (!product) {
      return NextResponse.json({ msg: "No product found" }, { status: 404 });
    }
    const publicId = getPublicIdFromUrl(product?.image);
    if (publicId) {
      await deleteFromCloudinary(publicId);
    }
    await prisma.product.delete({
      where: {
        id: parsedProductId,
      },
    });
    return NextResponse.json({ msg: "Product deleted successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
