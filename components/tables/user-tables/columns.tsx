'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/interfaces/models';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'USER ID'
  },
  {
    accessorKey: 'firstName',
    header: 'FIRST NAME'
  },
  {
    accessorKey: 'lastName',
    header: 'LAST NAME'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'phone',
    header: 'PHONE'
  },
  {
    accessorKey: 'role',
    header: 'ROLE'
  },
  {
    accessorKey: 'isBlocked',
    header: 'STATUS',
    cell: ({ getValue }) => (getValue() === 1 ? 'inactive' : 'active'),
    meta: {
      filterVariant: 'select',
      options: ['active', 'inactive']
    }
  },
  {
    accessorKey: 'actions',
    header: 'ACTIONS',
    id: 'actions',
    meta: {
      filterVariant: 'action'
    },
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
