'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { InputSearch } from '@/components/ui/input-search';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import Loading from '../ui/loading';

import isValidObjectId from '@/helper/isValidObjectId';

const createFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  desc: z.string().min(1, { message: 'Description is required' }),
  SKU: z.string().min(1, { message: 'SKU is required' }),
  category_id: z
    .string()
    .min(1, { message: 'Category is required' })
    .refine((val) => isValidObjectId(val), {
      message: 'Category is invalid'
    }),
  quantity: z
    .string()
    .min(1, { message: 'Quantity is required' })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num);
      },
      {
        message: 'Quantity must be a valid numbero'
      }
    ),
  discount_id: z.string().optional(),
  price: z
    .string()
    .min(1, { message: 'Price is required' })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: 'Price must be a valid number greater than zero'
      }
    )
});

const updateFormSchema = z.object({
  name: z.string().optional(),
  desc: z.string().optional(),
  SKU: z.string().optional(),
  category_id: z
    .string()
    .optional()
    .refine((val) => val === '' || (val && isValidObjectId(val)), {
      message: 'Category is invalid'
    }),
  inventory_id: z.string(),
  quantity: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          const num = Number(val);
          return !isNaN(num);
        }
      },
      {
        message: 'Quantity must be a valid numbero'
      }
    ),
  discount_id: z.string().optional(),
  price: z
    .string()
    .optional()
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: 'Price must be a valid number greater than zero'
      }
    )
});

type ProductFormValues = z.infer<
  typeof createFormSchema | typeof updateFormSchema
>;

interface ProductFormProps {
  initialData: any | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  console.log('initialData', initialData);
  const router = useRouter();
  const { toast } = useToast();
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categorySuggestions, setCategorySuggestions] = useState<any[]>([]);
  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData
    ? 'Product updated successfully.'
    : 'Product created successfully.';
  const action = initialData ? 'Save changes' : 'Create';
  if (initialData) {
    initialData.category_id = initialData.categoryDetail.name || '';
    initialData.quantity =
      initialData.inventoryDetail.quantity.toString() || '0';
  }
  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        desc: '',
        SKU: '',
        category_id: '',
        quantity: '0',
        discount_id: '',
        price: '0'
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(initialData ? updateFormSchema : createFormSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== '')
      );
      if (initialData) {
        await productApi.updateProduct(initialData._id, filteredData);
      } else {
        await productApi.createProduct(filteredData);
      }
      router.refresh();
      router.push(`/dashboard/product`);
      toast({
        variant: 'default',
        title: toastMessage,
        description: toastMessage
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  // const onDelete = async () => {
  //   try {
  //     setLoading(true);
  //     //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
  //     router.refresh();
  //     router.push(`/${params.storeId}/products`);
  //   } catch (error: any) {
  //   } finally {
  //     setLoading(false);
  //     setOpen(false);
  //   }
  // };

  const fetchCategorySuggestions = useCallback(async (query: string) => {
    try {
      // setLoading(true);
      let res = null;
      if (query === '') {
        res = await categoryApi.getCategories();
      } else {
        res = await categoryApi.getCategories({ name: query });
      }
      const data = res.response.categories;
      console.log('data', data);
      setCategorySuggestions(data);
    } catch (error) {
      console.error(error);
      setCategorySuggestions([]);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('form.getValues()', form.getValues());
  }, [form.getValues()]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            // onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      {loading ? (
        <Loading />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <div className="gap-8 md:grid md:grid-cols-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter your description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SKU"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your SKU"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <InputSearch
                        value={field.value || ''}
                        suggestions={categorySuggestions}
                        placeholder="Enter your category"
                        setReturnValue={field.onChange}
                        setSuggestions={setCategorySuggestions}
                        fetchSuggestions={fetchCategorySuggestions}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inventory Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your inventory"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        type="string"
                        placeholder="Enter your discount"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your price"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-start gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/product')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                {action}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};
