'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { IUser } from '@/interfaces/models';

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
      options: ['male', 'female']
    }
  },
  {
    accessorKey: 'birthdate',
    header: 'BIRTHDATE'
  },

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
    header: 'BLOCKED',

    cell: ({ getValue }) => (getValue() === true ? 'Inactive' : 'Active'),
    meta: {
      filterVariant: 'select',
      options: ['Active', 'Inactive']
    }
  },
  {
    accessorKey: 'isRootAdmin',
    header: 'ROOT ADMIN',
    cell: ({ getValue }) => (getValue() === true ? 'Yes' : 'No'),
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
