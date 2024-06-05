import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from "next/dynamic";
import RequestFormSkeleton from "./loading";

const RequestForm = dynamic(
  () => import('@/app/issues/_components/RequestForm'),
  { 
    ssr: false,
    loading: () => <RequestFormSkeleton />
  }
);

interface Props {
  params: { id: string }
}

const NewIssueRequestPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id)}
  });

  if (!issue) notFound();

  return (
    <RequestForm issue={issue} />
  )
}

export default NewIssueRequestPage