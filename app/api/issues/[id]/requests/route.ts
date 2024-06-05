import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { requestSchema } from '../../../../validationSchemas';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issueId = parseInt(params.id);
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = requestSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email as string },
  });

  if (!user)
    return NextResponse.json({}, { status: 401 });

  const existingRequest = await prisma.request.findFirst({
    where: { assignedToIssueId: issueId, userCreatedId: user.id },
  });

  if (existingRequest) {
    const newRequest = await prisma.request.update({
      where: { id: existingRequest.id },
      data: {
        price: parseInt(body.price),
        description: body.description,
        assignedToIssueId: issueId,
        userCreatedId: user.id,
      },
    });
  
    return NextResponse.json(newRequest, { status: 201 });
  } else {
    const newRequest = await prisma.request.create({
      data: {
        price: parseInt(body.price),
        description: body.description,
        assignedToIssueId: issueId,
        userCreatedId: user.id,
      },
    });
  
    return NextResponse.json(newRequest, { status: 201 });
  }
}
