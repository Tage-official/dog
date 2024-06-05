import Link from 'next/link';
import { Issue, Request, User } from '@prisma/client';
import { Card, Flex, Heading, Text, Avatar, Button } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import AssigneeButton from './AssigneeButton';

type PopulatedRequest = Request & { userCreated: User };

const Requests = ({ user, issue, requests }: { user?: User; issue: Issue; requests: PopulatedRequest[] }) => {
  return (
    <>
      <Heading size="4" as="h4">Запросы</Heading>
      <Flex direction="column" gap="4">
        {requests.map((request) => (
          <Card key={request.id} className="prose max-w-full" mt="4">
            <Flex gap="4" direction="column">
              <Flex gap="2">
                <Link
                  href={`/users/${request.userCreated.id}`}
                >
                  <Avatar
                    src={request.userCreated.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <Text>{request.userCreated.name} ({request.userCreated.email})</Text>
              </Flex>
              <Flex gap="2">
                <Text>Цена:</Text>
                <Text>{request.price.toString()} BYN</Text>
              </Flex>
            </Flex>
            <ReactMarkdown>{request.description}</ReactMarkdown>
            {(user?.id === issue.userCreatedId && !issue.assignedToUserId) && (
              <AssigneeButton
                issueId={request.assignedToIssueId.toString()}
                userId={request.userCreatedId}
              />
            )}
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default Requests;
