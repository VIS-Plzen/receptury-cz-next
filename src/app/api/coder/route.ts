// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { coder } from "@/utils/shorties";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { dataString, key, length } = await request.json();

  let response: any;
  try {
    response = coder(key, dataString, length);
  } catch (error) {
    return NextResponse.json({ success: false, error: "In try catch" });
  }
  return NextResponse.json(response);
}
