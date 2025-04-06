import prisma from "@/lib/db";
import { getToken } from "@/lib/generateToken";
import { uploadToCloudinary } from "@/lib/UploadToCloudinary";
import { createShopSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  try {
    const id = await getToken();
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 400 });
    }
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const uniqueUrl = formData.get("uniqueUrl") as string;
    const logo = formData.get("logo") as File | null;
    const banner = formData.get("banner") as File | null;

    const validatedData = createShopSchema.safeParse({
      name,
      description,
      category,
      uniqueUrl,
      logo,
      banner,
    });
    if (!validatedData.success) {
      return NextResponse.json({ msg: "Invalid Inputs" }, { status: 400 });
    }

    const shopExists = await prisma.shop.findUnique({
      where: { uniqueUrl },
    });
    if (shopExists) {
      return NextResponse.json({ msg: "Shop already exists" }, { status: 400 });
    }
    let logoUrl = null,
      bannerUrl = null;
    if (logo) {
      logoUrl = await uploadToCloudinary(logo, "popply/shop/logos").catch(
        (err) => {
          return null;
        }
      );
    }
    if (banner) {
      bannerUrl = await uploadToCloudinary(banner, "popply/shop/banners").catch(
        (err) => {
          return null;
        }
      );
    }

    if (logo && !logoUrl) {
      return NextResponse.json(
        { msg: "Failed to upload logo" },
        { status: 500 }
      );
    }
    if (banner && !bannerUrl) {
      return NextResponse.json(
        { msg: "Failed to upload banner" },
        { status: 500 }
      );
    }
    const newShop = await prisma.shop.create({
      data: {
        name,
        description,
        uniqueUrl,
        ownerId: id,
        category,
        logo: logoUrl,
        banner: bannerUrl,
      },
    });
    if (!newShop) {
      return NextResponse.json(
        { msg: "Failed to create new shop" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { id: newShop.id, uniqueUrl: newShop.uniqueUrl },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shopUrl = searchParams.get("url");
  try {
    if (!shopUrl) {
      return NextResponse.json(
        { msg: "No shop url provided" },
        { status: 400 }
      );
    }

    const shop = await prisma.shop.findUnique({
      where: {
        uniqueUrl: shopUrl,
      },
      include: {
        products: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          include: {
            shop: true,
            user: true
          }
        },
        views: true,
        upvotes: true

      },
    }); 

    if(!shop){
      return NextResponse.json({msg: "No shop found"}, {status: 404})
    };

    return NextResponse.json(shop, {status: 200})
  } catch (_) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
