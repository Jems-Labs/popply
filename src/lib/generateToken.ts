import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const SECRET_KEY = process.env.JWT_SECRET as string;
export async function generateTokenAndSetCookie(
  id: number,
  response: NextResponse
) {
  const token = jwt.sign({ id }, SECRET_KEY);
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
  });
  return response;
}
export const getToken = async () => {
  const token = (await cookies()).get("token")?.value;
  if (token) {  
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
    return decoded.id;
  }
};
  