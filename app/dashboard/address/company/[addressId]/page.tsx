'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CompanyAddressForm } from '@/components/forms/company-address-form';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';
import React from 'react';
import Loading from '@/components/ui/loading';
import isValidObjectId from '@/helper/isValidObjectId';
import { Address } from '@/types/address';
let breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Address', link: '/dashboard/address' },
  { title: 'Company Address', link: '/dashboard/address/company' },
  { title: 'Create', link: '/dashboard/address/company/new' }
];
export default function Page() {
  const { addressId } = useParams();
  const [address, setAddress] = React.useState<Address | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchAddress = async () => {
      if (addressId !== 'new' && isValidObjectId(addressId.toString())) {
        setLoading(true);
        breadcrumbItems = [
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Address', link: '/dashboard/address' },
          { title: 'Company Address', link: '/dashboard/address/company' },
          { title: 'Edit', link: `/dashboard/address/company/${addressId}` }
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
          <CompanyAddressForm initialData={address} key={address?._id} />
        </div>
      )}
    </PageContainer>
  );
}
