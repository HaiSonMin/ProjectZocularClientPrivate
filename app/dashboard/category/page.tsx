'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CategoryClient } from '@/components/tables/category-tables/client';
import categoryApi from '@/services/api/modules/category-api';
import React from 'react';
import { Category } from '@/types/category';
import Loading from '@/components/ui/loading';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Category', link: '/dashboard/category' }
];
export default function Page() {
  const [categories, setCategories] = React.useState<Category[]>([]);
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
          <CategoryClient
            data={categories}
            setData={setCategories}
            pagination={pagination}
          />
        )}
      </div>
    </PageContainer>
  );
}
