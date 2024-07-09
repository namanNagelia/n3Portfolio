import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;
  console.log({ name, email, message });
  return NextResponse.json({ message: "Message received" });
}
