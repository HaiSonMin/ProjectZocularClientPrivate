import { findAll } from '@/app/apis/models/product-categories.apis';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CategoryClient } from '@/components/tables/category-tables/client';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Category', link: '/dashboard/category' }
];
export default async function Page() {
  const { metadata } = await findAll();
  console.log('metadata', metadata);

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />

        <CategoryClient
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
