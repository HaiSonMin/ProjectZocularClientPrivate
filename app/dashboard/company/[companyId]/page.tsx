'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { CompanyForm } from '@/components/forms/company-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/components/ui/loading';
import { findOneById } from '@/app/apis/models/company.apis';
import { toast } from '@/components/ui/use-toast';
import { ICompany } from '@/interfaces/models/ICompany.interface';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Company', link: '/dashboard/company' },
  { title: 'Edit', link: '' }
];

export default function Page() {
  const { companyId } = useParams();
  const [company, setCompany] = useState<ICompany | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await findOneById(companyId as string);

      if (!response.metadata) {
        router.replace('/dashboard/user');
      }
      setCompany(response?.metadata ?? null);
    } catch (err) {
      toast({
        title: 'error',
        variant: 'destructive',
        description: 'Có lỗi xảy ra, vui lòng thử lại'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyId && companyId !== 'new') {
      setLoading(true);
      fetchData();
    }
  }, [companyId]);

  return (
    <ScrollArea className="h-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex-1 space-y-4 p-8">
          <Breadcrumbs items={breadcrumbItems} />
          <CompanyForm initialData={company} key={company?.id} />
        </div>
      )}
    </ScrollArea>
  );
}
