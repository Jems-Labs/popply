import { getToken } from "@/lib/generateToken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const id = await getToken();
  const { searchParams } = new URL(req.url);
  const shopId = searchParams.get("id");
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 400 });
    }
    if (!shopId) {
      return NextResponse.json({ msg: "No Shop Id provided" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
