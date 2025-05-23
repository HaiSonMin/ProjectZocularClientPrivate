'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { IUser } from '@/interfaces/models';
import dayjs from 'dayjs';

export const columns: ColumnDef<IUser>[] = [
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
    accessorKey: 'gender',
    header: 'GENDER',
    meta: {
      filterVariant: 'select',
      options: ['male', 'female', 'other']
    }
  },
  {
    accessorKey: 'birthdate',
    header: 'BIRTHDATE',
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return value ? dayjs(value).format('YYYY-MM-DD') : 'N/A';
    }
  },
  // {
  //   accessorKey: 'avatar',
  //   header: 'AVATAR',
  //   cell: ({ getValue }) => {
  //     const url = getValue<string>();
  //     return <Image  src={url} alt="avatar" className="w-10 h-10 rounded-full" />;
  //   },
  // },
  {
    accessorKey: 'role',
    header: 'ROLE'
  },
  {
    accessorKey: 'licenseNumber',
    header: 'LICENSE NO.'
  },
  {
    accessorKey: 'licenseState',
    header: 'LICENSE STATE'
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
    accessorKey: 'isRootAdmin',
    header: 'ROOT ADMIN',
    cell: ({ getValue }) => (getValue() === 1 ? 'Yes' : 'No'),
    meta: {
      filterVariant: 'select',
      options: ['Yes', 'No']
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
