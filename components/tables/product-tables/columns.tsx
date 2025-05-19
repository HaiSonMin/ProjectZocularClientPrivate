'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Product } from '@/types/product';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: '_id',
    header: 'PRODUCT ID'
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'desc',
    header: 'DESCRIPTION'
  },
  {
    accessorKey: 'SKU',
    header: 'SKU'
  },
  {
    accessorKey: 'price',
    header: 'PRICE',
    meta: {
      filterVariant: 'range'
    }
  },
  {
    accessorKey: 'categoryDetail.name',
    header: 'CATEGORY'
  },
  {
    accessorKey: 'inventoryDetail.quantity',
    header: 'INVENTORY',
    meta: {
      filterVariant: 'range'
    }
  },
  // {
  //   accessorKey: 'discount_id',
  //   header: 'DISCOUNT'
  // },
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
