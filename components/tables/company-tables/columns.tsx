'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { ICompany } from '@/interfaces/models/ICompany.interface';

export const columns: ColumnDef<ICompany>[] = [
  {
    accessorKey: 'id',
    header: 'Company ID'
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'businessSpecialty',
    header: 'BUSINESS SPECIALTY'
  },
  {
    accessorKey: 'phone',
    header: 'PHONE'
  },
  {
    accessorKey: 'fax',
    header: 'FAX'
  },
  {
    accessorKey: 'type',
    header: 'TYPE',
    meta: {
      filterVariant: 'select',
      options: ['group', 'distributor', 'sales_rep', 'professional']
    }
  },
  {
    accessorKey: 'address',
    header: 'ADDRESS'
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
