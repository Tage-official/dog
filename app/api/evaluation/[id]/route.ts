import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  // Убедитесь, что текущий пользователь имеет права на добавление оценки
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user!.email as string },
  });
  if (!currentUser) return NextResponse.json({}, { status: 401 });

  // Убедитесь, что целевой пользователь существует
  const targetUser = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!targetUser) return NextResponse.json({}, { status: 404, message: "User not found" });

  // Добавляем новую оценку
  const newEvaluation = await prisma.evaluation.create({
    data: {
      value: body.eval,
      userId: params.id,
    },
  });

  return NextResponse.json(newEvaluation, { status: 200 });
}
