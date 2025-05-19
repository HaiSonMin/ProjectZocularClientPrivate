'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, RefreshCcw, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Company } from '@/types/company';
import companyApi from '@/services/api/modules/company-api';
import { useState } from 'react';
import Loading from '@/components/ui/loading';

interface ProductsClientProps {
  data: Company[];
  setData: (data: Company[]) => void;
  pagination: any;
}

export const CompanyClient: React.FC<ProductsClientProps> = ({
  data,
  setData,
  pagination
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const refreshData = async () => {
    setLoading(true);
    const { response } = await companyApi.getCompanies();
    setData(response.companies);
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
              title={`Companies (${data ? data.length : 0})`}
              description="Manage companies"
            />
            <div className="">
              <Button className="mx-2 text-xs md:text-sm" onClick={refreshData}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
              </Button>
              <Button
                className="mx-2 text-xs md:text-sm"
                onClick={() => router.push(`/dashboard/company/new`)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </div>
          </div>
          <Separator />
          <DataTable<Company, any>
            columns={columns}
            data={data}
            tableType={'company'}
            pagination={pagination}
          />
        </>
      )}
    </>
  );
};
