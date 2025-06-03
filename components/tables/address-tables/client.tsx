'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import React from 'react';
import { IAddress } from '@/interfaces/models';

interface AddressClientProps {
  data: IAddress[];
  pagination: any;
}

export const AddressClient: React.FC<AddressClientProps> = ({
  data,
  pagination
}) => {
  const router = useRouter();
  // const [loading, setLoading] = React.useState<boolean>(false);

  const refreshData = async () => {
    // setLoading(true);
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Addresses (${pagination?.total || 0})`}
          description="Manage addresses"
        />
        <div className="">
          <Button className="mx-2 text-xs md:text-sm" onClick={refreshData}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button
            onClick={() => router.push(`/dashboard/address/new`)}
            className="relative mx-2 text-xs md:text-sm"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable<IAddress, any>
        columns={columns}
        data={data}
        tableType={'address'}
        pagination={pagination}
      />
    </>
  );
};
