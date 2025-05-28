'use client';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  RowData
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ScrollArea } from './scroll-area';
import { ArrowDown, ArrowUp } from 'lucide-react';

import { DebouncedInput } from './debounce-input';
import { findAll } from '@/app/apis/models/users.apis';
import { ECompare } from '@/interfaces/common/IRequest.interface';
import { buildQueryString } from '@/app/utils';
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'action';
    options?: string[]; // For select
    accessorKey?: string;
    defaultFilterOperator?: ECompare; // THÊM DÒNG NÀY
  }
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableType:
    | 'user'
    | 'company'
    | 'address'
    | 'userAddress'
    | 'companyAddress'
    | 'category'
    | 'product'
    | 'order';
  pagination: any;
}

export function DataTable<TData, TValue>({
  columns,
  data: initialData,
  tableType,
  pagination: initialPagination
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [data, setData] = useState(initialData);
  const [pagination, setPagination] = useState({
    pageIndex: Number(initialPagination?.current_page) || 0,
    pageSize: 10
  });
  const [totalPages, setTotalPages] = useState(
    Math.ceil((initialPagination.totalItems ?? 0) / pagination.pageSize)
  );
  // const [loading, setLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    filterFns: {
      dateBetweenFilterFn: (row, columnId, filterValue: [number, number]) => {
        const value = row.getValue(columnId) as number;
        return value >= filterValue[0] && value <= filterValue[1];
      },
      statusFilterFn: (row, columnId, filterValue) => {
        return row.getValue(columnId) === filterValue;
      }
    },
    state: {
      columnFilters,

      pagination,
      sorting
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onPaginationChange: (updater) => {
      setPagination((old) => {
        const newValue = typeof updater === 'function' ? updater(old) : updater;
        if (
          old.pageIndex === newValue.pageIndex &&
          old.pageSize === newValue.pageSize
        ) {
          return old;
        }
        return newValue;
      });
    },
    onSortingChange: (updater) => {
      setSorting((old) => {
        const newValue = typeof updater === 'function' ? updater(old) : updater;

        if (JSON.stringify(old) === JSON.stringify(newValue)) {
          return old;
        }
        return newValue;
      });
    },
    onColumnFiltersChange: (updater) => {
      setColumnFilters((old) => {
        const newValue = typeof updater === 'function' ? updater(old) : updater;

        if (JSON.stringify(old) === JSON.stringify(newValue)) {
          return old;
        }
        return newValue;
      });
    },

    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false
  });

  useEffect(() => {
    const loadData = async () => {
      // setLoading(true);
      const options: any = {};
      if (pagination.pageSize > 0) {
        if (pagination.pageIndex > 0) {
          options.page = pagination.pageIndex;
        }
        options.limit = pagination.pageSize;
      }

      // Handle sorting
      if (sorting.length > 0) {
        options.sortChildrenBy = sorting[0].id;
        options.sortDir = sorting[0].desc ? 'DESC' : 'ASC';
      }

      options.filters = [];
      columnFilters.forEach((filter) => {
        options.filters.push(filter);
      });

      let result;
      switch (tableType) {
        case 'user':
          result = await findAll(buildQueryString(options));

          if (result.metadata && result.metadata.items) {
            setData(result.metadata.items as TData[]);
          } else {
            setData([]);
          }
          break;
        case 'company':
          result = await companyApi.getCompanies(options);
          setData(result.response.companies);
          break;
        case 'address':
          result = await addressApi.getAddresses(options);
          setData(result.response.addresses);
          break;
        case 'userAddress':
          result = await addressApi.getUserAddresses(options);
          setData(result.response.addresses);
          break;
        case 'companyAddress':
          result = await addressApi.getCompanyAddresses(options);
          setData(result.response.addresses);
          break;
        case 'category':
          result = await categoryApi.getCategories(options);
          setData(result.response.categories);
          break;
        case 'product':
          result = await productApi.getProducts(options);
          setData(result.response.products);
          break;
        case 'order':
          result = await orderApi.getOrders(options);
          setData(result.response.orders);
          break;
      }
      if (result) {
        const totalItems = result.metadata.totalItems;
        setTotalPages(Math.ceil(totalItems / pagination.pageSize));
      }
      // setLoading(false);
    };

    loadData();
  }, [columnFilters, pagination, sorting, table, tableType]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) :  */}
      <ScrollArea className="h-[calc(80vh-150px)] rounded-md border">
        <Table className="relative">
          <TableHeader>
            <tr>
              {table.getHeaderGroups()[0].headers.map((header) => (
                <th key={`filter-${header.id}`}>
                  {header.column.getCanFilter() ? (
                    <div className="ml-2 flex justify-start py-2">
                      <Filter column={header.column} />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className:
                                header.column.getCanSort() &&
                                !header.column.columnDef.meta?.filterVariant?.includes(
                                  'action'
                                )
                                  ? 'cursor-pointer select-none flex items-center ml-2 py-4'
                                  : '',
                              onClick:
                                header.column.columnDef.meta?.filterVariant?.includes(
                                  'action'
                                )
                                  ? undefined
                                  : header.column.getToggleSortingHandler()
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {!header.column.columnDef.meta?.filterVariant?.includes(
                              'action'
                            ) &&
                              ({
                                asc: <ArrowUp className="ml-2 h-4 w-4" />,
                                desc: <ArrowDown className="ml-2 h-4 w-4" />
                              }[header.column.getIsSorted() as string] ??
                                null)}
                          </div>
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex} of{' '}
            {initialPagination.total_pages}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min={1}
            max={initialPagination.total_pages}
            defaultValue={table.getState().pagination.pageIndex}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, options } = column.columnDef.meta ?? {};

  return filterVariant === 'action' ? (
    <></>
  ) : filterVariant === 'range' ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-full rounded border p-2 shadow"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-full rounded border p-2 shadow"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="w-full rounded border p-2 shadow outline-none"
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">{`${column.columnDef.header}`}</option>
      {options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ) : (
    <DebouncedInput
      className="w-full rounded border p-2 shadow"
      onChange={(value) => {
        column.setFilterValue(value);
      }}
      placeholder={`${column.columnDef.header}...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}
