'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { IProduct } from '@/interfaces/models';
import { removeMulti } from '@/app/apis/models/product.apis';
import { toast } from '@/components/ui/use-toast';

interface CellActionProps {
  data: IProduct;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const onConfirm = async () => {
    startTransition(() => {
      (async () => {
        try {
          const response = await removeMulti({ ids: [data.id] });

          if (response.statusCode === 200) {
            router.replace('/dashboard/product');
            toast({
              title: 'success',
              variant: 'destructive',
              description: 'User deleted successfully'
            });
          } else {
            toast({
              title: 'warning',
              variant: 'destructive',
              description: response?.message
            });
          }
        } catch (error: any) {
          toast({
            title: 'error',
            variant: 'destructive',
            description: 'An error occurred, please try again.'
          });
        } finally {
          setOpen(false);
        }
      })();
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/product/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(data.id);
            }}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
