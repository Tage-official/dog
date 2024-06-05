import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; requestId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json(
      { error: "Неверный заказ" },
      { status: 404 }
    );

  const issueRequest = await prisma.request.findUnique({
    where: { id: parseInt(params.requestId) },
  });
  if (!issueRequest)
    return NextResponse.json(
      { error: "Неверный запрос" },
      { status: 404 }
    );

  const updatedRequest = await prisma.request.update({
    where: { id: issueRequest.id },
    data: {
      price: parseInt(body.price),
      description: body.description,
    },
  });

  return NextResponse.json(updatedRequest);
}
