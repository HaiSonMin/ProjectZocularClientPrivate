import { findAll } from '@/app/apis/models/product.apis';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ProductClient } from '@/components/tables/product-tables/client';
import React from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Product', link: '/dashboard/product' }
];
export default async function Page() {
  const { metadata } = await findAll();

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />

        <ProductClient
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
