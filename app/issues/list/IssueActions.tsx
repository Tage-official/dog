import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';
import IssueOwnerFilter from './IssueOwnerFilter';

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Flex gap="4">
        <IssueStatusFilter />
        <IssueOwnerFilter />
      </Flex>
      <Button>
        <Link href="/issues/new">Новый Заказ</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
