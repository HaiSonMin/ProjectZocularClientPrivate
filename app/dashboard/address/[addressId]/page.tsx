'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loading from '@/components/ui/loading';
import { IAddress } from '@/interfaces/models';
import { AddressForm } from '@/components/forms/address-form';
import { findOneById } from '@/app/apis/models/address.apis';
import { toast } from '@/components/ui/use-toast';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Address', link: '/dashboard/address' },
  { title: 'Create', link: '/dashboard/address/create' }
];
export default function Page() {
  const { addressId } = useParams();
  const [address, setAddress] = React.useState<IAddress | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await findOneById(addressId as string);

      if (!response.metadata) {
        router.replace('/dashboard/address');
      }
      setAddress(response?.metadata ?? null);
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
    if (addressId && addressId !== 'new') {
      setLoading(true);
      fetchData();
    }
  }, [addressId]);

  return (
    <PageContainer scrollable={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <AddressForm initialData={address} key={address?.id} />
        </div>
      )}
    </PageContainer>
  );
}
