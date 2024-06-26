'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue, User } from '@prisma/client';
import { Button, Callout, Heading, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

const VerificationForm = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      // if (issue) {
      //   await axios.patch('/api/issues/' + issue.id, data);
      // } else {
      //   await axios.post('/api/issues', data);
      // }
      // router.push('/issues/list');
      // router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('Возникла непредвиденная ошибка.');
    }
  });

  const mdeOptions = useMemo(() => ({ spellChecker: false }), []);

  return (
    <div className="max-w-xl">
      <form className="space-y-3" onSubmit={onSubmit}>
        <Heading size="4" mb="5">Загрузите фотографию документа, удостоверяющего вашу личность</Heading>
        <input type="file" onChange={handleFileChange} />
        <Button disabled={isSubmitting}>
          {'Отправить на рассмотрение'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default VerificationForm;
