'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ProductClient } from '@/components/tables/product-tables/client';
import React from 'react';
import { Product } from '@/types/product';
import Loading from '@/components/ui/loading';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Product', link: '/dashboard/product' }
];
export default function Page() {
  const [products, setProducts] = React.useState<Product[]>([]);
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
          <ProductClient
            data={products}
            setData={setProducts}
            pagination={pagination}
          />
        )}
      </div>
    </PageContainer>
  );
}
