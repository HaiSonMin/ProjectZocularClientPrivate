'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';
import React from 'react';
import addressApi from '@/services/api/modules/address-api';
import Loading from '@/components/ui/loading';
import isValidObjectId from '@/helper/isValidObjectId';
import { UserAddressForm } from '@/components/forms/user-address-form';
import { Address } from '@/types/address';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Address', link: '/dashboard/address' },
  { title: 'User Address', link: '/dashboard/address/user' },
  { title: 'Create', link: '/dashboard/address/user/create' }
];
export default function Page() {
  const { addressId } = useParams();
  const [address, setAddress] = React.useState<Address | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchAddress = async () => {
      console.log('addressId', addressId);
      if (addressId !== 'new' && isValidObjectId(addressId.toString())) {
        setLoading(true);
        breadcrumbItems = [
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Address', link: '/dashboard/address' },
          { title: 'User Address', link: '/dashboard/address/user' },
          { title: 'Edit', link: `/dashboard/address/user/${addressId}` }
        ];
        const res = await addressApi.getAddressById(addressId.toString());
        setAddress(res.response);
        setLoading(false);
      }
    };
    fetchAddress();
  }, [addressId]);
  return (
    <PageContainer scrollable={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <UserAddressForm initialData={address} key={address?._id} />
        </div>
      )}
    </PageContainer>
  );
}
