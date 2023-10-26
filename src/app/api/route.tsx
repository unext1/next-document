import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  console.log("hi");
  return NextResponse.json({ messege: "hi" }, { status: 200 });
}
