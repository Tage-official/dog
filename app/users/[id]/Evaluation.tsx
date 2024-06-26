'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Callout, Heading, TextField } from '@radix-ui/themes';
import Spinner from '@/app/components/Spinner';
import axios from 'axios';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { getSession } from 'next-auth/react';

interface Props {
  params: { id: string };
  user: User;
}

export default function EvaluationPage({ params, user }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setSubmitting] = useState(false);
  const [evaluat, setevaluat] = useState('5');
  const [averageEval, setAverageEval] = useState<number | null>(null);
  const [userSes, setUserSes] = useState<any>(null)

  const getUser = async () => {
    const session = await getSession()

    console.log(user, session)

    setUserSes(session?.user?.email)
  }
  
  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    // Fetch evaluations for the user and calculate the average
    const fetchEvaluations = async () => {
      try {
        const response = await axios.get(`/api/getEval/${user.id}`);
        const evaluations = response.data;
        if (evaluations.length > 0) {
          const total = evaluations.reduce((sum: number, evaluation: { value: string }) => sum + parseFloat(evaluation.value), 0);
          setAverageEval(total / evaluations.length);
        }
      } catch (error) {
        console.log('Error fetching evaluations:', error);
      }
    };

    fetchEvaluations();
  }, [user.id]);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`/api/evaluation/${user.id}`, {
        eval: evaluat,
      });
      // Fetch evaluations again after submitting a new one
      const newResponse = await axios.get(`/api/getEval/${user.id}`);
      const evaluations = newResponse.data;
      if (evaluations.length > 0) {
        const total = evaluations.reduce((sum: number, evaluation: { value: string }) => sum + parseFloat(evaluation.value), 0);
        setAverageEval(total / evaluations.length);
      }
    } catch (error) {
      console.log('Error: Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form className="space-y-3" onSubmit={handleSubmit((data) => {
        setSubmitting(true);
        onSubmit(data);
      })}>
        {userSes != user.email && <Heading size="4" mb="5">Оцените пользователя</Heading>}
        {userSes != user.email && <TextField.Root style={{ display: 'flex' }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i + 1} onClick={() => { setevaluat((i + 1).toString()) }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
          ))}
        </TextField.Root>}
        {userSes != user.email && <Button type="submit" disabled={isSubmitting}>
          Оценить
          {isSubmitting && <Spinner />}
        </Button>}
      </form>
      {averageEval !== null && <div className='desc' style={{ display: 'flex' }}>
        <Heading size="4" mb="5">Заказчики оценили работу исполнителя на</Heading>
        <div style={{ marginLeft: '15px' }}>{averageEval.toFixed(2)}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
      </div>}
    </div>
  );
}
