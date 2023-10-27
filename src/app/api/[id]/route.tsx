import GetDoc from "@/lib/getDoc";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  const document = await GetDoc({ id });

  return NextResponse.json(document, { status: 200 });
}
