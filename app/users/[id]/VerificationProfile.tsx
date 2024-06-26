'use client';

import { useEffect, useState } from 'react';
import React from "react";
import { useForm } from 'react-hook-form';
import { Button, Callout, Heading, TextField } from '@radix-ui/themes';
import { Spinner } from '@/app/components';
import './style.css'
import axios from 'axios';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { getSession } from 'next-auth/react';

interface Props {
  params: { id: any };
  user: User
}

export default function VerificationProfile({ params, user }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setSubmitting] = useState(false);
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [userSes, setUserSes] = useState<any>(null)


  const getUser = async () => {
    const session = await getSession()

    console.log(user, session)

    setUserSes(session?.user?.email)
  }
  
  useEffect(() => {
    getUser()
  }, [])


  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`/api/verify/${user.id}`, {
        eval: '5',
      });

      // Send email notification
      await axios.post('/api/send-email', {
        email: user.email,
        subject: 'Верификация успешна',
        message: `Пользователь ${user.name || user.email} был успешно верифицирован.`,
        link: 'google.com' // Add relevant link
      });
    } catch (error) {
      console.log(`Error: 'Something went wrong'}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {(!user.isVerified && userSes === user.email) ? <Heading size="4" mb="5">Для выполнения заказов вам необходимо пройти верификацию</Heading> : <Heading size="4" mb="5">Пользователь успешно прошел верификацию</Heading>}
      {(!user.isVerified && userSes === user.email) && <form className="space-y-3" onSubmit={handleSubmit((data) => {
        setSubmitting(true);
        onSubmit(data);
        setSubmitting(false);
      })}>
        <input type="file" onChange={handleFileChange} />
        <Button type="submit" disabled={isSubmitting}>
          Отправить
          {isSubmitting && <Spinner />}
        </Button>
      </form>}
    </div>
  );
}
