'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Company, CompanyStatus, CompanyType } from '@/types/company';

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: '_id',
    header: 'Company ID'
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'bussiness_specialty',
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
      options: Object.values(CompanyType)
    }
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    meta: {
      filterVariant: 'select',
      options: Object.values(CompanyStatus)
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
