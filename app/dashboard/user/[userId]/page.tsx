'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserForm } from '@/components/forms/user-form';
import PageContainer from '@/components/layout/page-container';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loading from '@/components/ui/loading';
import { findOneById } from '@/app/apis/models/users.apis';
import { IUser } from '@/interfaces/models';
import { toast } from '@/components/ui/use-toast';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
  { title: 'Edit', link: '' }
];
export default function Page() {
  const { userId } = useParams();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findOneById(userId as string);

        if (!response.metadata) {
          router.replace('/dashboard/user');
        }
        setUser(response?.metadata ?? null);
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

    if (userId && userId !== 'new') {
      setLoading(true);
      fetchData();
    }
  }, [userId, router]);

  return (
    <PageContainer scrollable={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <UserForm initialData={user} key={user?.id} />
        </div>
      )}
    </PageContainer>
  );
}
