'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductForm } from '@/components/forms/product-form';
import PageContainer from '@/components/layout/page-container';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loading from '@/components/ui/loading';
import { IProduct } from '@/interfaces/models';
import { toast } from '@/components/ui/use-toast';
import { findOneById } from '@/app/apis/models/product.apis';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Product', link: '/dashboard/product' },
  { title: 'Create', link: '/dashboard/product/create' }
];
export default function Page() {
  const { productId } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await findOneById(productId as string);

      if (!response.metadata) {
        router.replace('/dashboard/product');
      }
      setProduct(response?.metadata ?? null);
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
    if (productId && productId !== 'new') {
      setLoading(true);
      fetchData();
    }
  }, [productId]);

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
