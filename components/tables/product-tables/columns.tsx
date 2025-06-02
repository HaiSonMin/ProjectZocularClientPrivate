import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { IProduct } from '@/interfaces/models';

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'id',
    header: 'PRODUCT ID'
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'description',
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
    accessorKey: 'category.name',
    header: 'CATEGORY'
  },
  {
    accessorKey: 'inventory.quantity',
    header: 'INVENTORY'
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
