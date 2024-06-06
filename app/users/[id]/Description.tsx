'use client';

import { cache, useEffect, useState } from 'react';
import React from "react";
import { useForm } from 'react-hook-form';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { Spinner } from '@/app/components';


interface Props {
  params: { id: string };
}


export default async function DescPage() {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setSubmitting] = useState(false);

  const [desc, setDesct] = useState('')
  const [final, setFinal] = useState<any>(false)


  useEffect(() => {
    console.log(control)
  }, [desc])

  const onSubmit = () => {
    setFinal(desc)
  }

  return (
    <div>
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder="Опишите собаку"
            value={desc}
            onChange={(e) => setDesct(e.target.value)}
          />
        </TextField.Root>
        <Button disabled={isSubmitting}>
          Cохранить
          {isSubmitting && <Spinner />}
        </Button>
      </form>
      <div>
        {final && {final}}
      </div>
    </div>
  );
}