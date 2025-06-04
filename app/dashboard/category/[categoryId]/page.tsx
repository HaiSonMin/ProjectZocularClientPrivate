'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CategoryForm } from '@/components/forms/category-form';
import PageContainer from '@/components/layout/page-container';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loading from '@/components/ui/loading';
import { IProductsCategory } from '@/interfaces/models';
import { toast } from '@/components/ui/use-toast';
import { findOneById } from '@/app/apis/models/product-categories.apis';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Category', link: '/dashboard/category' },
  { title: 'Create', link: '/dashboard/category/new' }
];
export default function Page() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<IProductsCategory | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findOneById(categoryId as string);

        if (!response.metadata) {
          router.replace('/dashboard/category');
        }
        setCategory(response?.metadata ?? null);
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

    if (categoryId && categoryId !== 'new') {
      setLoading(true);
      fetchData();
    }
  }, [categoryId, router]);
  return (
    <PageContainer scrollable={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <CategoryForm initialData={category} key={category?.id} />
        </div>
      )}
    </PageContainer>
  );
}
