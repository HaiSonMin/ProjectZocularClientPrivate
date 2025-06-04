'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserForm } from '@/components/forms/user-form';
import PageContainer from '@/components/layout/page-container';
import React from 'react';
import Loading from '@/components/ui/loading';
import { IUser } from '@/interfaces/models';

let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
  { title: 'Create', link: '/dashboard/user/create' }
];
export default function Page() {
  let user: IUser | null = null;
  let loading = true;
  return (
    <PageContainer scrollable={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <UserForm initialData={user} />
        </div>
      )}
    </PageContainer>
  );
}
