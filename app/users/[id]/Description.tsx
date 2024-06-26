'use client';

import { useEffect, useState } from 'react';
import React from "react";
import { useForm } from 'react-hook-form';
import { Button, Callout, Heading, TextField } from '@radix-ui/themes';
import { Spinner } from '@/app/components';
import './style.css'
import axios from 'axios';
import { User } from '@prisma/client';

interface Props {
  params: { id: any };
  user: User
}

export default function DescPage({ params, user }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setSubmitting] = useState(false);
  const [desc, setDesc] = useState('');
  const [final, setFinal] = useState<any>(false);


  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`/api/description/${user.id}`, {
        dogDesc: desc,
      });

    } catch (error) {
      console.log(`Error: 'Something went wrong'}`);
    }

  };


  return (
    <div>
      <form className="space-y-3" onSubmit={handleSubmit((data) => {
        setSubmitting(true);
        onSubmit(data);
        setSubmitting(false);
      })}>
        {!user.dogDesc && <TextField.Root>
          <TextField.Input
            placeholder="Опишите себя или собаку"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </TextField.Root>}
        {!user.dogDesc && <Button type="submit" disabled={isSubmitting}>
          Сохранить
          {isSubmitting && <Spinner />}
        </Button>}
      </form>
      {user.dogDesc && <div className='desc'>
        <Heading size="4" mb="5">Описание</Heading>
         <div>{user.dogDesc}</div>
      </div>}
    </div>
  );
}
