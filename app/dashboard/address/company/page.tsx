'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { AddressClient } from '@/components/tables/address-tables/client';
import React from 'react';
import { Address } from '@/types/address';
import addressApi from '@/services/api/modules/address-api';
import Loading from '@/components/ui/loading';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Address', link: '/dashboard/address' },
  { title: 'Company Address', link: '/dashboard/address/company' }
];
export default function Page() {
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<any>({
    total: 0,
    total_pages: 0,
    current_page: 1
  });
  React.useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const { response } = await addressApi.getCompanyAddresses();
        console.log('response', response);
        setAddresses(response.addresses);
        setPagination(response.pagination);
        setLoading(false);
      } catch (error) {
        // Handle error appropriately
      }
    };
    fetchAddresses();
  }, []);
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        {loading ? (
          <Loading />
        ) : (
          <AddressClient
            data={addresses}
            setData={setAddresses}
            pagination={pagination}
            type="company"
          />
        )}
      </div>
    </PageContainer>
  );
}
