import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import IssueChart from './IssueChart';
import { Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface Props {
  params: { id: string };
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
