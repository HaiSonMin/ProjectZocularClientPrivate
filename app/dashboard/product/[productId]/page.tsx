'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductForm } from '@/components/forms/product-form';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';
import React from 'react';
import { Product } from '@/types/product';
import Loading from '@/components/ui/loading';
import isValidObjectId from '@/helper/isValidObjectId';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Product', link: '/dashboard/product' },
  { title: 'Create', link: '/dashboard/product/create' }
];
export default function Page() {
  const { productId } = useParams();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchProduct = async () => {
      if (productId !== 'new' && isValidObjectId(productId.toString())) {
        setLoading(true);
        breadcrumbItems = [
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Product', link: '/dashboard/product' },
          { title: 'Edit', link: `/dashboard/product/${productId}` }
        ];
        const res = await productApi.getProduct(productId.toString());
        setProduct(res.response);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);
  return (
    <PageContainer scrollable={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <ProductForm initialData={product} key={product?._id} />
        </div>
      )}
    </PageContainer>
  );
}
