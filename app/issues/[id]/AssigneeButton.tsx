"use client";

import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ userId, issueId }: { userId: string; issueId: string }) => {
  const router = useRouter();
  
  const assignIssue = () => {
    axios
      .patch("/api/issues/" + issueId, {
        assignedToUserId: userId || null,
      })
      .catch(() => {
        toast.error("Изменения не могут быть сохранены.");
      });
    router.push('/issues/' + issueId);
    router.refresh();
  };

  return (
    <>
      <Button onClick={assignIssue}>
        Assign
      </Button>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
