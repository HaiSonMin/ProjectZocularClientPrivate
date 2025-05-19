'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CompanyClient } from '@/components/tables/company-tables/client';
import React from 'react';
import { Company } from '@/types/company';
import Loading from '@/components/ui/loading';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Company', link: '/dashboard/company' }
];
export default function Page() {
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<any>({
    total: 0,
    total_pages: 0,
    current_page: 1
  });

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        {loading ? (
          <Loading />
        ) : (
          <CompanyClient
            data={companies}
            setData={setCompanies}
            pagination={pagination}
          />
        )}
      </div>
    </PageContainer>
  );
}
