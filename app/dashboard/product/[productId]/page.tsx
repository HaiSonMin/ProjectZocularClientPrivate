'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductForm } from '@/components/forms/product-form';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Loading from '@/components/ui/loading';
import { IProduct } from '@/interfaces/models';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Product', link: '/dashboard/product' },
  { title: 'Create', link: '/dashboard/product/create' }
];
export default function Page() {
  const { productId } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <PageContainer scrollable={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <ProductForm initialData={product} key={product?.id} />
        </div>
      )}
    </PageContainer>
  );
}
