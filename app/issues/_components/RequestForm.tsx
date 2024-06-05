'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { requestSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue, Request } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type RequestFormData = z.infer<typeof requestSchema>;

const RequestForm = ({ issue, request }: { issue: Issue, request?: Request }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (request) {
        await axios.patch('/api/issues/' + issue.id + '/requests' + request.id, data);
      } else {
        await axios.post('/api/issues/' + issue.id + '/requests' , data);
      }
      router.push('/issues/' + issue.id);
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('Возникла непредвиденная ошибка.');
    }
  });

  const mdeOptions = useMemo(() => ({ spellChecker: false }), []);

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={request?.price.toNumber()}
            placeholder="Цена"
            type="number"
            {...register('price', {
              valueAsNumber: true,
            })}
          />
        </TextField.Root>
        <ErrorMessage>{errors.price?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={request?.description}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Описание"
              options={mdeOptions}
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {request ? 'Обновить Запрос' : 'Создать Запрос'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default RequestForm;
