import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import StatusIssueButton from './StatusIssueButton';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import RequestIssueButton from './RequestIssueButton';
import Requests from './Requests';
import { cache } from 'react';

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      assignedToUser: true,
    },
  });

  if (!issue) notFound();

  const requests = await prisma.request.findMany({
    where: { assignedToIssueId: issue.id },
    include: {
      userCreated: true,
    },
  });

  let user = null;

  if (session) {
    user = await prisma.user.findUnique({
      where: { email: session.user!.email as string },
    });
  }

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
        <br />
        <Requests user={user || undefined} issue={issue} requests={requests} />
      </Box>
      {session && user && (
        user.id === issue.userCreatedId ? (
          <Box>
            <Flex direction="column" gap="4">
              {issue.assignedToUserId ? (
                <StatusIssueButton issue={issue} />
              ) : (
                <>
                  <EditIssueButton issueId={issue.id} />
                  <DeleteIssueButton issueId={issue.id} />
                </>
              )}
            </Flex>
          </Box>
        ) : !issue.assignedToUserId && (
          <Box>
            <RequestIssueButton issueId={issue.id} />
          </Box>
        )
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Детали заказа ' + issue?.id
  }
}

export default IssueDetailPage;
