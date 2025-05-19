'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Address, AddressType } from '@/types/address';

const baseColumns: ColumnDef<Address>[] = [
  {
    accessorKey: 'address_line1',
    header: 'ADDRESS LINE 1'
  },
  {
    accessorKey: 'address_line2',
    header: 'ADDRESS LINE 2'
  },
  {
    accessorKey: 'city',
    header: 'CITY'
  },
  {
    accessorKey: 'zip_code',
    header: 'ZIP CODE'
  },
  {
    accessorKey: 'state',
    header: 'STATE'
  },
  {
    accessorKey: 'country',
    header: 'COUNTRY'
  }
];

export const columns: ColumnDef<Address>[] = [
  {
    accessorKey: '_id',
    header: 'ID'
  },
  {
    accessorKey: 'user_id',
    header: 'USER ID'
  },
  {
    accessorKey: 'company_id',
    header: 'COMPANY ID'
  },
  ...baseColumns,
  {
    accessorKey: 'type',
    header: 'TYPE',
    meta: {
      filterVariant: 'select',
      options: Object.values(AddressType)
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

export const userColumns: ColumnDef<Address>[] = [
  {
    accessorKey: '_id',
    header: 'ID'
  },
  {
    accessorKey: 'user_id',
    header: 'USER ID'
  },
  ...baseColumns,
  {
    accessorKey: 'type',
    header: 'TYPE',
    meta: {
      filterVariant: 'select',
      options: [AddressType.CUSTOMER]
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

export const companyColumns: ColumnDef<Address>[] = [
  {
    accessorKey: '_id',
    header: 'ID'
  },
  {
    accessorKey: 'company_id',
    header: 'COMPANY ID'
  },
  ...baseColumns,
  {
    accessorKey: 'type',
    header: 'TYPE',
    meta: {
      filterVariant: 'select',
      options: [AddressType.COMPANY, AddressType.BILLING, AddressType.SHIPPING]
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
