'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Category } from '@/types/category';
import { Plus, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import Loading from '@/components/ui/loading';
import React from 'react';

interface ProductsClientProps {
  data: Category[];
  setData: (data: Category[]) => void;
  pagination: any;
}

export const CategoryClient: React.FC<ProductsClientProps> = ({
  data,
  setData,
  pagination
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const refreshData = async () => {
    setLoading(true);
    const { response } = await categoryApi.getCategories();
    setData(response.categories);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-start justify-between">
            <Heading
              title={`Categories (${pagination?.total || 0})`}
              description="Manage categories"
            />
            <div className="">
              <Button className="mx-2 text-xs md:text-sm" onClick={refreshData}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
              </Button>
              <Button
                className="mx-2 text-xs md:text-sm"
                onClick={() => router.push(`/dashboard/category/new`)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </div>
          </div>
          <Separator />
          <DataTable<Category, any>
            columns={columns}
            data={data}
            tableType={'category'}
            pagination={pagination}
          />
        </>
      )}
    </>
  );
};
