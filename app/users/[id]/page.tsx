import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import IssueChart from './IssueChart';
import { Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { cache, useState } from 'react';
import React from "react";
import { useForm } from 'react-hook-form';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { Spinner } from '@/app/components';
import DescPage from './Description';
import SectionTitle from '@/app/components/sectionTitle';
import EvaluationPage from './Evaluation';
import VerificationProfile from './VerificationProfile';


interface Props {
  params: { id: any };
}
const fetchUser = cache((userId: string) => prisma.user.findUnique({ where: { id: userId } }));

export default async function UserPage({ params }: Props) {
  const user = await fetchUser(params.id);

  if (!user) notFound();
  
  const open = await prisma.issue.count({
    where: { status: 'OPEN', assignedToUserId: user.id },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS', assignedToUserId: user.id },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED', assignedToUserId: user.id },
  });


  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      {/* <SectionTitle
        pretitle="Личные данные">
        Имя:
        Email:
</SectionTitle> */}

      {/* <VerificationProfile user={user} params={params.id}></VerificationProfile> */}

      <Flex direction="column" gap="5">
        <IssueSummary
          open={open}
          inProgress={inProgress}
          closed={closed}
        />
        <IssueChart
          open={open}
          inProgress={inProgress}
          closed={closed}
        />
      </Flex>
      <LatestIssues user={user} />
      <DescPage user={user} params={params.id}></DescPage>
      <EvaluationPage user={user} params={params.id}></EvaluationPage>
      <VerificationProfile user={user} params={params.id}></VerificationProfile>
    </Grid>
  );
}



export async function generateMetadata({ params }: Props) {
  const user = await fetchUser(params.id);

  return {
    title: user?.name,
    description: 'Детали пользователя ' + user?.id
  }
}
