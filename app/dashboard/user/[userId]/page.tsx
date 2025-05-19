'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserForm } from '@/components/forms/user-form';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';
import React from 'react';
import { User } from '@/types/user';
import Loading from '@/components/ui/loading';
import isValidObjectId from '@/helper/isValidObjectId';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
  { title: 'Create', link: '/dashboard/user/create' }
];
export default function Page() {
  const { userId } = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchUser = async () => {
      if (userId !== 'new' && isValidObjectId(userId.toString())) {
        setLoading(true);
        breadcrumbItems = [
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'User', link: '/dashboard/user' },
          { title: 'Edit', link: `/dashboard/user/${userId}` }
        ];
        const res = await userApi.getUserById(userId.toString());
        setUser(res.response);
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);
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
