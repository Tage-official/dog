import { IssueStatusBadge } from '@/app/components'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import NextLink from 'next/link';
import { Issue, Request, Status, User } from '@prisma/client'

export interface IssueQuery {
  status: Status;
  ownership: 'my' | 'unassigned' | 'assigned';
  orderBy: keyof Issue;
  page: string;
}

interface Props { 
  searchParams: IssueQuery;
  user?: User;
  issues: (Issue & { assignedRequests: Request[] })[];
}

const IssueTable = ({ searchParams, user, issues }: Props) => {
  return (
    <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: column.value === 'requests' ? { ...searchParams } : {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.assignedRequests.length}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}

const columns: {
  label: string;
  value: keyof Issue | 'requests';
  className?: string;
}[] = [
  { label: 'Заказ', value: 'title' },
  {
    label: 'Статус',
    value: 'status',
    className: 'hidden md:table-cell',
  },
  {
    label: 'Запросы',
    value: 'requests',
    className: 'hidden md:table-cell',
  },
  {
    label: 'Создано',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

export const columnNames = columns.map(column => column.value);


export default IssueTable