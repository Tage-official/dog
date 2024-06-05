import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status, User } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

const getFilterByOwnership = (user: User, ownership?: string) => {
  if (ownership === 'my') {
    return {
      OR: [
        { userCreatedId: user.id },
      ],
    };
  }
  if (ownership === 'unassigned') {
    return {
      assignedToUserId: null,
      userCreatedId: { not: user.id },
    };
  }
  if (ownership === 'assigned') {
    return {
      assignedToUserId: user.id,
    };
  }

  return {
    OR: [
      { assignedToUserId: null },
      { assignedToUserId: user.id },
      { userCreatedId: user.id },
    ],
  };
};

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  let user: User | null = null;

  const session = await getServerSession();

  if (session) {
    user = await prisma.user.findUnique({
      where: { email: session.user!.email as string },
    });
  }

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const ownerships = ['my', 'unassigned', 'assigned'];
  const ownership = ownerships.includes(searchParams.ownership)
    ? searchParams.ownership
    : undefined;

  const where = user ? {
    status,
    ...getFilterByOwnership(user, ownership),
  } : {
    status,
  };

  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignedRequests: true,
    },
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} user={user || undefined} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dog Walking - Список Заказов',
  description: 'Показать все заказы в системе'
};

export default IssuesPage;
