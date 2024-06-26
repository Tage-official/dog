import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const evaluations = await prisma.evaluation.findMany({
    where: { userId: params.id },
  });

  return NextResponse.json(evaluations, { status: 200 });
}
