'use client';

import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const ownerships: { label: string; value?: string }[] = [
  { label: 'Все заказы' },
  { label: 'Только мои заказы', value: 'my' },
  { label: 'Только не назначенные заказы', value: 'unassigned' },
  { label: 'Только назначенные на меня заказы', value: 'assigned' },
];

const IssueOwnerFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get('ownership') || ''}
      onValueChange={(ownership) => {
        const params = new URLSearchParams();
        if (ownership) params.append('ownership', ownership);
        if (searchParams.get('orderBy'))
          params.append('orderBy', searchParams.get('orderBy')!);
        if (searchParams.get('status'))
          params.append('status', searchParams.get('status')!);

        const query = params.size ? '?' + params.toString() : '';
        router.push('/issues/list' + query);
      }}
    >
      <Select.Trigger placeholder="Фильтр по назначению..." />
      <Select.Content>
        {ownerships.map((ownership) => (
          <Select.Item
            key={ownership.value || ''}
            value={ownership.value || ''}
          >
            {ownership.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueOwnerFilter;
