import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/client';
import React from 'react';
import { findAll } from '@/app/apis/models/users.apis';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' }
];
export default async function Page() {
  const { metadata } = await findAll();

  let pagination = {
    page: 1,
    pageSize: 10,
    total: 0
  };

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />

        <UserClient data={metadata?.items ?? []} pagination={pagination} />
      </div>
    </PageContainer>
  );
}
