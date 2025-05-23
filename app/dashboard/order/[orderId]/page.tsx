'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserForm } from '@/components/forms/user-form';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';
import React from 'react';
import Loading from '@/components/ui/loading';
import isValidObjectId from '@/helper/isValidObjectId';
import { IUser } from '@/interfaces/models';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
  { title: 'Create', link: '/dashboard/user/create' }
];
export default function Page() {
  const { userId } = useParams();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <PageContainer scrollable={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <UserForm initialData={user} key={user?._id} />
        </div>
      )}
    </PageContainer>
  );
}
