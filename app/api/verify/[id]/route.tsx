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

  // Убедитесь, что текущий пользователь имеет права на изменение оценки
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user!.email as string },
  });
  if (!currentUser) return NextResponse.json({}, { status: 401 });

  // Обновление оценки указанного пользователя
  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: {
      isVerified: true,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}
