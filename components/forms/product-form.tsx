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
import { useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import Loading from '../ui/loading';

import { findAll as findAllCategory } from '@/app/apis/models/product-categories.apis';
import FileUpload from '../file-upload';
import { findAll as findAllInventory } from '@/app/apis/models/inventory.apis';
import { findAll as findAllDiscount } from '@/app/apis/models/discount.apis';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { create, removeMulti, update } from '@/app/apis/models/product.apis';
import { AlertModal } from '../modal/alert-modal';

export const createFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),

  thumb: z.string().url({ message: 'Thumbnail must be a valid URL' }),

  imgs: z
    .array(z.string().url({ message: 'Each image must be a valid URL' }))
    .min(1, { message: 'At least one image URL is required' }),

  price: z
    .string()
    .min(1, { message: 'Price is required' })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: 'Price must be a number' })
    .refine((val) => val > 0, { message: 'Price must be greater than zero' }),

  SKU: z.string().min(1, { message: 'SKU is required' }),

  description: z.string().min(1, { message: 'Description is required' }),

  attributes: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Attribute name is required' }),
        value: z.string().min(1, { message: 'Attribute value is required' })
      })
    )
    .min(1, { message: 'At least one attribute is required' }),

  category: z.string().min(1, { message: 'Category is required' }),

  inventory: z.string().min(1, { message: 'Inventory is required' }),

  discount: z.string().min(1, { message: 'Discount is required' }),

  isActive: z.boolean()
});

export const updateFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).optional(),

  thumb: z
    .string()
    .url({ message: 'Thumbnail must be a valid URL' })
    .optional(),

  imgs: z
    .array(z.string().url({ message: 'Each image must be a valid URL' }))
    .optional(),

  price: z
    .union([
      z
        .number({ invalid_type_error: 'Price must be a number' })
        .positive({ message: 'Price must be greater than zero' }),
      z
        .string()
        .min(1, { message: 'Price is required' })
        .refine(
          (val) => {
            const num = Number(val);
            return !isNaN(num) && num > 0;
          },
          { message: 'Price must be a valid number greater than zero' }
        )
        .transform((val) => Number(val))
    ])
    .optional(),

  SKU: z.string().min(1, { message: 'SKU is required' }).optional(),

  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .optional(),

  attributes: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Attribute name is required' }),
        value: z.string().min(1, { message: 'Attribute value is required' })
      })
    )
    .optional(),

  category: z.string().min(1, { message: 'Category is required' }).optional(),

  inventory: z.string().min(1, { message: 'Inventory is required' }).optional(),

  discount: z.string().min(1, { message: 'Discount is required' }).optional(),

  isActive: z.boolean().optional()
});

type ProductFormValues = z.infer<
  typeof createFormSchema | typeof updateFormSchema
>;

interface ProductFormProps {
  initialData: any | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, startTransition] = useTransition();
  const [category, setCategory] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [discount, setDiscount] = useState<any[]>([]);

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData
    ? 'Product updated successfully.'
    : 'Product created successfully.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        price: '',
        SKU: '',
        category: '',
        description: '',
        inventory: '',
        discount: '',
        attributes: [],
        thumb: '',
        imgs: [],
        isActive: true
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(initialData ? updateFormSchema : createFormSchema),
    defaultValues
  });

  const fetchCategory = useCallback(async (query: string) => {
    try {
      const res = await findAllCategory();

      setCategory(res?.metadata?.items ?? []);
    } catch (error) {
      console.error(error);
      setCategory([]);
    }
  }, []);

  const fetchInventory = useCallback(async (query: string) => {
    try {
      const res = await findAllInventory();

      setInventory(res?.metadata?.items ?? []);
    } catch (error) {
      console.error(error);
      setInventory([]);
    }
  }, []);

  const fetchDiscount = useCallback(async (query: string) => {
    try {
      const res = await findAllDiscount();

      setDiscount(res?.metadata?.items ?? []);
    } catch (error) {
      console.error(error);
      setDiscount([]);
    }
  }, []);

  const onSubmit = async (data: ProductFormValues) => {
    debugger;

    startTransition(() => {
      (async () => {
        try {
          const response = initialData
            ? await update(initialData.id, data)
            : await create(data);

          console.log('response', response);

          if (response.statusCode === 200) {
            if (!initialData) {
              form.reset();
            }
            toast({
              title: 'success',
              variant: 'destructive',
              description: toastMessage
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
        }
      })();
    });
  };

  const onConfirm = async () => {
    startTransition(() => {
      (async () => {
        try {
          const response = await removeMulti({ ids: [initialData.id] });

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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
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
              {/* Attributes Field - Thêm mới */}
              <FormField
                control={form.control}
                name="attributes"
                render={({ field }) => (
                  <FormItem className="md:col-span-3">
                    <FormLabel>Product Attributes</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {(field.value || []).map((attribute, index) => (
                          <div key={index} className="flex items-end gap-4">
                            <div className="flex-1">
                              <Input
                                placeholder="Attribute name (e.g., Color)"
                                value={attribute.name || ''}
                                onChange={(e) => {
                                  const newAttributes = [
                                    ...(field.value || [])
                                  ];
                                  newAttributes[index] = {
                                    ...newAttributes[index],
                                    name: e.target.value
                                  };
                                  field.onChange(newAttributes);
                                }}
                                disabled={loading}
                              />
                            </div>
                            <div className="flex-1">
                              <Input
                                placeholder="Attribute value (e.g., Red)"
                                value={attribute.value || ''}
                                onChange={(e) => {
                                  const newAttributes = [
                                    ...(field.value || [])
                                  ];
                                  newAttributes[index] = {
                                    ...newAttributes[index],
                                    value: e.target.value
                                  };
                                  field.onChange(newAttributes);
                                }}
                                disabled={loading}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newAttributes = (
                                  field.value || []
                                ).filter((_, i) => i !== index);
                                field.onChange(newAttributes);
                              }}
                              disabled={loading}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newAttributes = [
                              ...(field.value || []),
                              { name: '', value: '' }
                            ];
                            field.onChange(newAttributes);
                          }}
                          disabled={loading}
                        >
                          Add Attribute
                        </Button>
                      </div>
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
                        placeholder="Enter your sku"
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <InputSearch
                        value={field.value || ''}
                        suggestions={category}
                        placeholder="Enter your category"
                        setReturnValue={field.onChange}
                        setSuggestions={setCategory}
                        fetchSuggestions={fetchCategory}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your description"
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
                name="inventory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inventory</FormLabel>
                    <FormControl>
                      <InputSearch
                        value={field.value || ''}
                        suggestions={inventory}
                        placeholder="Enter your inventory"
                        setReturnValue={field.onChange}
                        setSuggestions={setInventory}
                        fetchSuggestions={fetchInventory}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <InputSearch
                        value={field.value || ''}
                        suggestions={discount}
                        placeholder="Enter your discount"
                        setReturnValue={field.onChange}
                        setSuggestions={setDiscount}
                        fetchSuggestions={fetchDiscount}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail product</FormLabel>
                    <FormControl>
                      <FileUpload
                        maxFiles={1}
                        value={field.value || ''}
                        onChange={field.onChange}
                        acceptedTypes={['image/*']}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imgs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images detail product</FormLabel>
                    <FormControl>
                      <FileUpload
                        maxFiles={10}
                        value={
                          Array.isArray(field.value)
                            ? field.value
                            : field.value
                            ? [field.value]
                            : []
                        }
                        onChange={field.onChange}
                        acceptedTypes={['image/*']}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="isActive"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                        value={field.value === true ? 'true' : 'false'}
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Active</SelectItem>
                          <SelectItem value="false">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
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
