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
  thumb: z
    .string()
    .url({ message: 'Thumbnail must be a valid URL' })
    .optional(),
  imgs: z
    .array(z.string().url({ message: 'Image must be a valid URL' }))
    .optional(),
  price: z
    .number()
    .positive({ message: 'Price must be greater than zero' })
    .or(
      z
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
        .transform((val) => Number(val))
    ),
  SKU: z.string().min(1, { message: 'SKU is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  attributes: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Attribute name is required' }),
        value: z.string().min(1, { message: 'Attribute value is required' })
      })
    )
    .optional(),
  category: z
    .string()
    .min(1, { message: 'Category is required' })
    .refine((val) => isValidObjectId(val), {
      message: 'Category is invalid'
    }),
  inventory: z
    .string()
    .min(1, { message: 'Inventory is required' })
    .refine((val) => isValidObjectId(val), {
      message: 'Inventory is invalid'
    }),
  discount: z.string().optional(),
  isActive: z.boolean().default(true)
});

const updateFormSchema = z.object({
  name: z.string().optional(),
  thumb: z
    .string()
    .url({ message: 'Thumbnail must be a valid URL' })
    .optional(),
  imgs: z
    .array(z.string().url({ message: 'Image must be a valid URL' }))
    .optional(),
  price: z
    .number()
    .positive({ message: 'Price must be greater than zero' })
    .optional()
    .or(
      z
        .string()
        .optional()
        .refine(
          (val) => {
            if (val) {
              const num = Number(val);
              return !isNaN(num) && num > 0;
            }
            return true;
          },
          {
            message: 'Price must be a valid number greater than zero'
          }
        )
        .transform((val) => (val ? Number(val) : undefined))
    ),
  SKU: z.string().optional(),
  description: z.string().optional(),
  attributes: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Attribute name is required' }),
        value: z.string().min(1, { message: 'Attribute value is required' })
      })
    )
    .optional(),
  category: z
    .string()
    .optional()
    .refine((val) => !val || val === '' || (val && isValidObjectId(val)), {
      message: 'Category is invalid'
    }),
  inventory: z
    .string()
    .optional()
    .refine((val) => !val || val === '' || (val && isValidObjectId(val)), {
      message: 'Inventory is invalid'
    }),
  discount: z.string().optional(),
  isActive: z.boolean().optional()
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

  const onSubmit = async (data: ProductFormValues) => {};

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
