import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function GET(request: NextRequest) {
   const session = await getServerSession(authOptions);
   if (!session)
     return NextResponse.json({}, { status: 401 });
 
   const user = await prisma.user.findFirst({
      where: { email: session.user!.email as string }
   });

   return NextResponse.json(user);
}