'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import Loading from '@/components/ui/loading';
import React, { FC, useState } from 'react';
import { IUser } from '@/interfaces/models';
interface ProductsClientProps {
  data: IUser[];

  pagination: any;
}

export const UserClient: FC<ProductsClientProps> = ({
  data,

  pagination
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data ? data.length : 0})`}
          description="Manage users"
        />
        <div className="">
          <Button className="mx-2 text-xs md:text-sm">
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button
            className="mx-2 text-xs md:text-sm"
            onClick={() => router.push(`/dashboard/user/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable<IUser, any>
        columns={columns}
        data={data}
        tableType={'user'}
        pagination={pagination}
      />
    </>
  );
};
