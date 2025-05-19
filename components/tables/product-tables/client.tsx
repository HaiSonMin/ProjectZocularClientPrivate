'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import Loading from '@/components/ui/loading';
import React from 'react';
import { Product } from '@/types/product';
import productApi from '@/services/api/modules/product-api';
interface ProductsClientProps {
  data: Product[];
  setData: (data: Product[]) => void;
  pagination: any;
}

export const ProductClient: React.FC<ProductsClientProps> = ({
  data,
  setData,
  pagination
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const refreshData = async () => {
    setLoading(true);
    const { response } = await productApi.getProducts();
    setData(response.products);
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
              title={`Products (${pagination.total || 0})`}
              description="Manage products"
            />
            <div className="">
              <Button className="mx-2 text-xs md:text-sm" onClick={refreshData}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
              </Button>
              <Button
                className="mx-2 text-xs md:text-sm"
                onClick={() => router.push(`/dashboard/product/new`)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </div>
          </div>
          <Separator />
          <DataTable<Product, any>
            columns={columns}
            data={data}
            tableType={'product'}
            pagination={pagination}
          />
        </>
      )}
    </>
  );
};
