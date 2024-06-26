import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import { Metadata } from 'next';
import { useEffect } from 'react';
import Checker from './components/checker';

export default async function Home() {
  const isVerified = await prisma.user.findMany({
    where: { isVerified: true },
  });


  return (
    <Checker data={isVerified}></Checker>
  );
}

export const dynamic = 'force-dynamic'; 

export const metadata: Metadata = {
  title: 'Dog Walking - Верифицированные пользователи',
  description: 'Верифицированные пользователи'
};