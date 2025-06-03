import { ColumnDef } from '@tanstack/react-table';
import { EAddressType } from '@/enums/models/EAddressType.enum';
import { IAddress } from '@/interfaces/models';
import { CellAction } from './cell-action';

const baseColumns: ColumnDef<IAddress>[] = [
  {
    accessorKey: 'addressLines',
    header: 'ADDRESS LINES',
    cell: ({ row }) => {
      const addressLines = row.original.addressLines;
      return (
        <div className="space-y-1">
          {addressLines.map((line, index) => (
            <div key={index} className="text-sm">
              {line}
            </div>
          ))}
        </div>
      );
    }
  },
  {
    accessorKey: 'city',
    header: 'CITY'
  },
  {
    accessorKey: 'zipCode',
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

export const columns: ColumnDef<IAddress>[] = [
  ...baseColumns,
  {
    accessorKey: 'type',
    header: 'TYPE',
    meta: {
      filterVariant: 'select',
      options: Object.values(EAddressType)
    }
  },
  {
    accessorKey: 'primaryPhone',
    header: 'PRIMARY PHONE'
  },
  {
    accessorKey: 'secondaryPhone',
    header: 'SECONDARY PHONE',
    cell: ({ row }) => row.original.secondaryPhone || '-'
  },

  {
    accessorKey: 'isDefault',
    header: 'DEFAULT',
    cell: ({ row }) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          row.original.isDefault
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        {row.original.isDefault ? 'Yes' : 'No'}
      </span>
    )
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
