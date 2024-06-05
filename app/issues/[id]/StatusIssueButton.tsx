'use client';

import { Spinner } from '@/app/components';
import { Issue } from '@prisma/client';
import { Button } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const StatusIssueButton = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const progressIssue = async () => {
    try {
      setIsProcessing(true);
      await axios.patch('/api/issues/' + issue.id, {
        status: 'IN_PROGRESS',
      });
      router.push('/issues/' + issue.id);
      router.refresh();
    } catch (error) {
      setIsProcessing(false);
      setError(true);
    }
  };

  const closeIssue = async () => {
    try {
      setIsProcessing(true);
      await axios.patch('/api/issues/' + issue.id, {
        status: 'CLOSED',
      });
      router.push('/issues/' + issue.id);
      router.refresh();
    } catch (error) {
      setIsProcessing(false);
      setError(true);
    }
  };

  switch (issue.status) {
    case 'OPEN':
      return (
        <Button
          variant="outline"
          disabled={isProcessing}
          onClick={progressIssue}
        >
          В Процессе
          {isProcessing && <Spinner />}
        </Button>
      );
    case 'IN_PROGRESS':
      return (
        <Button
          variant="outline"
          disabled={isProcessing}
          onClick={closeIssue}
        >
          Закрыть
          {isProcessing && <Spinner />}
        </Button>
      );
    default:
      return null;
  }
};

export default StatusIssueButton;
