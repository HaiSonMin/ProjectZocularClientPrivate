import { findAll } from '@/app/apis/models/address.apis';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { AddressClient } from '@/components/tables/address-tables/client';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Address', link: '/dashboard/address' }
];
export default async function Page() {
  const { metadata } = await findAll();

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />

        <AddressClient
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
