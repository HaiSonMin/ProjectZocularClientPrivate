'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { OrderClient } from '@/components/tables/order-tables/client';
import orderApi from '@/services/api/modules/order-api';
import React from 'react';
import { Order } from '@/types/order';
import Loading from '@/components/ui/loading';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Order', link: '/dashboard/order' }
];
export default function Page() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<any>({
    total: 0,
    total_pages: 0,
    current_page: 1
  });

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        {loading ? (
          <Loading />
        ) : (
          <OrderClient
            data={orders}
            setData={setOrders}
            pagination={pagination}
          />
        )}
      </div>
    </PageContainer>
  );
}
