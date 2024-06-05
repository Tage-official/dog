import { IssueStatusBadge } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

type PopulatedIssue = Issue & { assignedToUser: User | null };

const IssueDetails = ({ issue }: { issue: PopulatedIssue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Text>Адрес</Text>:{' '}
      <Text>{issue.address}</Text>
      <br />
      <Text>Номер телефона</Text>:{' '}
      <Text>{issue.phoneNumber}</Text>
      {issue.assignedToUser && (
        <>
          <br />
          <Text>Назначен</Text>:{' '}
          <Link href={`/users/${issue.assignedToUser.id}`}>
            <Text>{issue.assignedToUser.name}</Text>
          </Link>
        </>
      )}
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
