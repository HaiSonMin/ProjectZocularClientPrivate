'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { CompanyForm } from '@/components/forms/company-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Company } from '@/types/company';
import { useParams } from 'next/navigation';
import React from 'react';
import Loading from '@/components/ui/loading';
import isValidObjectId from '@/helper/isValidObjectId';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Company', link: '/dashboard/company' },
  { title: 'Create', link: '/dashboard/company/create' }
];

export default function Page() {
  const { companyId } = useParams();
  const [company, setCompany] = React.useState<Company | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      if (companyId !== 'new' && isValidObjectId(companyId.toString())) {
        breadcrumbItems = [
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Company', link: '/dashboard/company' },
          { title: 'Edit', link: `/dashboard/company/${companyId}` }
        ];
        const { response } = await companyApi.getCompanyById(
          companyId.toString()
        );
        setCompany(response);
      }
      setLoading(false);
    };
    fetchCompany();
  }, [companyId]);
  return (
    <ScrollArea className="h-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex-1 space-y-4 p-8">
          <Breadcrumbs items={breadcrumbItems} />
          <CompanyForm initialData={company} key={company?._id} />
        </div>
      )}
    </ScrollArea>
  );
}
