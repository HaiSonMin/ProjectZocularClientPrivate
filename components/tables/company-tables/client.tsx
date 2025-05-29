'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { ICompany } from '@/interfaces/models/ICompany.interface';

interface ProductsClientProps {
  data: ICompany[];
  pagination: any;
}

export const CompanyClient: React.FC<ProductsClientProps> = ({
  data,

  pagination
}) => {
  const router = useRouter();

  return (
    <>
      <>
        <div className="flex items-start justify-between">
          <Heading
            title={`Companies (${data ? data.length : 0})`}
            description="Manage companies"
          />
          <div className="">
            <Button className="mx-2 text-xs md:text-sm">
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
        <DataTable<ICompany, any>
          columns={columns}
          data={data}
          tableType={'company'}
          pagination={pagination}
        />
      </>
    </>
  );
};
