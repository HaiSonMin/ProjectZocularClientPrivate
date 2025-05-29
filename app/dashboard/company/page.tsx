import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CompanyClient } from '@/components/tables/company-tables/client';
import React from 'react';
import { findAll } from '@/app/apis/models/company.apis';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Company', link: '/dashboard/company' }
];
export default async function Page() {
  const { metadata } = await findAll();

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />

        <CompanyClient
          data={metadata?.items ?? []}
          pagination={{
            current_page: 1,
            total: metadata?.totalItems
          }}
        />
      </div>
    </PageContainer>
  );
}
