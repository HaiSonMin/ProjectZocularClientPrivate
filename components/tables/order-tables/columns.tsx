'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Order, OrderStatus, OrderMethod, PaymentStatus } from '@/types/order';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: '_id',
    header: 'ORDER ID'
  },
  {
    accessorKey: 'user_id',
    header: 'USER ID'
  },
  {
    accessorKey: 'userDetail.first_name',
    header: 'FIRST NAME'
  },
  {
    accessorKey: 'userDetail.last_name',
    header: 'LAST NAME'
  },
  {
    accessorKey: 'userDetail.email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'total',
    header: 'TOTAL',
    meta: {
      filterVariant: 'range'
    }
  },
  {
    accessorKey: 'shipping_address',
    header: 'SHIPPING ADDRESS'
  },
  {
    accessorKey: 'method',
    header: 'METHOD',
    meta: {
      filterVariant: 'select',
      options: Object.values(OrderMethod)
    }
  },
  {
    accessorKey: 'paymentDetail.provider',
    header: 'PAYMENT PROVIDER'
  },
  {
    accessorKey: 'paymentDetail.status',
    header: 'PAYMENT STATUS',
    meta: {
      filterVariant: 'select',
      options: Object.values(PaymentStatus)
    }
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    meta: {
      filterVariant: 'select',
      options: Object.values(OrderStatus)
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
