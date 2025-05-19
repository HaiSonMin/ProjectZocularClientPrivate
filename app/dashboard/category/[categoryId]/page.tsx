'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CategoryForm } from '@/components/forms/category-form';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';
import React from 'react';
import { Category } from '@/types/category';
import categoryApi from '@/services/api/modules/category-api';
import Loading from '@/components/ui/loading';
import isValidObjectId from '@/helper/isValidObjectId';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Category', link: '/dashboard/category' },
  { title: 'Create', link: '/dashboard/category/new' }
];
export default function Page() {
  const { categoryId } = useParams();
  const [category, setCategory] = React.useState<Category | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId !== 'new' && isValidObjectId(categoryId.toString())) {
        setLoading(true);
        breadcrumbItems = [
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Category', link: '/dashboard/category' },
          { title: 'Edit', link: `/dashboard/category/${categoryId}` }
        ];
        const res = await categoryApi.getCategoryById(categoryId.toString());
        setCategory(res.response);
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryId]);
  return (
    <PageContainer scrollable={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <CategoryForm initialData={category} key={category?._id} />
        </div>
      )}
    </PageContainer>
  );
}
