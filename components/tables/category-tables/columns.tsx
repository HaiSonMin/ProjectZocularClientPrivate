'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { IProductsCategory } from '@/interfaces/models';
import Image from 'next/image';

export const columns: ColumnDef<IProductsCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },

  {
    accessorKey: 'slug',
    header: 'Slug'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'productCategory',
    header: 'Parent Category',
    cell: ({ row }) => {
      const value = row.original.productCategory;
      if (!value) return 'None';
      return typeof value === 'string' ? value : value.name;
    }
  },

  {
    accessorKey: 'isActive',
    header: 'Active',

    cell: ({ getValue }) => (getValue() === true ? 'Inactive' : 'Active'),
    meta: {
      filterVariant: 'select',
      options: ['Active', 'Inactive']
    }
  },
  {
    accessorKey: 'img',
    header: 'Image URL',
    meta: {
      filterVariant: 'action'
    },
    cell: ({ row }) => {
      const url = row.original.img;
      return (
        <Image
          width={100}
          height={100}
          src={url}
          alt={row.original.name}
          className="h-16 w-16 rounded object-cover"
        />
      );
    }
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    id: 'actions',
    meta: {
      filterVariant: 'action'
    },
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
