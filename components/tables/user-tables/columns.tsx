'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/types/user';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: '_id',
    header: 'USER ID'
  },
  {
    accessorKey: 'first_name',
    header: 'FIRST NAME'
  },
  {
    accessorKey: 'last_name',
    header: 'LAST NAME'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'mobile_phone',
    header: 'MOBILE PHONE'
  },
  {
    accessorKey: 'telephone',
    header: 'TELEPHONE'
  },
  {
    accessorKey: 'role',
    header: 'ROLE',
    meta: {
      filterVariant: 'select',
      options: [
        'CUSTOMER',
        'PROFESSIONAL_USER',
        'DISTRIBUTOR_USER',
        'SALES_REP_USER',
        'GROUP_USER',
        'SUPER_ADMIN'
      ]
    }
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
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
