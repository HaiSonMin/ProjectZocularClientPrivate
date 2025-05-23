'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Address } from '@/types/address';
import { Plus, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns, companyColumns, userColumns } from './columns';
import Loading from '@/components/ui/loading';
import React, { useEffect } from 'react';

interface AddressClientProps {
  data: Address[];
  setData: (data: Address[]) => void;
  pagination: any;
  type: 'all' | 'user' | 'company';
}

export const AddressClient: React.FC<AddressClientProps> = ({
  data,
  setData,
  pagination,
  type
}) => {
  const router = useRouter();
  // const [loading, setLoading] = React.useState<boolean>(false);
  const [showAddNewBtnPopup, setShowAddNewBtnPopup] =
    React.useState<boolean>(false);
  const [triggerClosePopup, setTriggerClosePopup] =
    React.useState<boolean>(false);
  const refreshData = async () => {
    // setLoading(true);
    let result;
    switch (type) {
      case 'all':
        result = await addressApi.getAddresses();
        break;
      case 'user':
        result = await addressApi.getUserAddresses();
        break;
      case 'company':
        result = await addressApi.getCompanyAddresses();
        break;
    }
    setData(result?.response.addresses);
    // setLoading(false);
  };

  const handleClosePopup = () => {
    setTriggerClosePopup((prev) => !prev);
  };

  const handleAddNewBtnClick = () => {
    if (type === 'all') {
      setShowAddNewBtnPopup((prev) => !prev);
    } else if (type === 'company') {
      router.push(`/dashboard/address/company/new`);
    } else {
      router.push(`/dashboard/address/user/new`);
    }
  };

  useEffect(() => {
    setShowAddNewBtnPopup(false);
  }, [triggerClosePopup]);

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <>
        <div className="flex items-start justify-between">
          <Heading
            title={`Addresses (${pagination?.total || 0})`}
            description="Manage addresses"
          />
          <div className="">
            <Button className="mx-2 text-xs md:text-sm" onClick={refreshData}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button
              className="relative mx-2 text-xs md:text-sm"
              onClick={handleAddNewBtnClick}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
              {showAddNewBtnPopup && (
                <div className="absolute right-0 top-12 z-50 flex flex-col gap-2">
                  <Button
                    className="z-50 w-[200px] text-xs md:text-sm"
                    onClick={() => {
                      router.push(`/dashboard/address/user/new`);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New User Address
                  </Button>
                  <Button
                    className="z-50 w-[200px] text-xs md:text-sm"
                    onClick={() => {
                      router.push(`/dashboard/address/company/new`);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Company Address
                  </Button>
                  <div
                    className="z-49 fixed bottom-0 left-0 right-0 top-0 h-screen w-screen"
                    onClick={handleClosePopup}
                  ></div>
                </div>
              )}
            </Button>
          </div>
        </div>
        <Separator />
        <DataTable<Address, any>
          columns={
            type === 'all'
              ? columns
              : type === 'user'
              ? userColumns
              : companyColumns
          }
          data={data}
          tableType={
            type === 'all'
              ? 'address'
              : type === 'user'
              ? 'userAddress'
              : 'companyAddress'
          }
          pagination={pagination}
        />
      </>
      {/* )} */}
    </>
  );
};
