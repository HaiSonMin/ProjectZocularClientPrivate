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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import Loading from '../ui/loading';
import { EAddressType } from '@/enums/models/EAddressType.enum';
import { create, removeMulti, update } from '@/app/apis/models/address.apis';
import { AlertModal } from '../modal/alert-modal';

const createFormSchema = z
  .object({
    address_line1: z.string().min(1, { message: 'Address line 1 is required' }),
    address_line2: z.string().min(1, { message: 'Address line 2 is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    zipCode: z.string().min(1, { message: 'Zip code is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    type: z.nativeEnum(EAddressType, {
      required_error: 'Type is required'
    }),
    primaryPhone: z.string().min(1, { message: 'Primary phone is required' }),
    secondaryPhone: z
      .string()
      .min(1, { message: 'Secondary phone is required' }),
    isDefault: z.boolean({
      required_error: 'Default status is required'
    })
  })
  .transform((data) => ({
    ...data,
    addressLines: [data.address_line1, data.address_line2]
  }));

const updateFormSchema = z
  .object({
    address_line1: z.string().optional(),
    address_line2: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    type: z.nativeEnum(EAddressType).optional(),
    primaryPhone: z.string().optional(),
    secondaryPhone: z.string().optional(),
    isDefault: z.boolean().optional()
  })
  .transform((data) => {
    const result: any = { ...data };

    if (data.address_line1 || data.address_line2) {
      result.addressLines = [data.address_line1, data.address_line2].filter(
        Boolean
      );
      delete result.address_line1;
      delete result.address_line2;
    }

    return result;
  });
type FormValues = z.infer<typeof createFormSchema | typeof updateFormSchema>;

interface UserFormProps {
  initialData: any | null;
}

const transformAddressToFormData = (apiData: any) => {
  if (!apiData) return null;

  const { addressLines, ...rest } = apiData;

  return {
    ...rest,
    address_line1: addressLines?.[0] || '',
    address_line2: addressLines?.[1] || '',
    // Convert isDefault từ number về boolean nếu cần
    isDefault: rest.isDefault === 1 || rest.isDefault === true
  };
};

export const AddressForm: React.FC<UserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const title = initialData ? 'Edit address' : 'Create address';
  const description = initialData ? 'Edit a address.' : 'Add a new address';
  const toastMessage = initialData
    ? 'Address updated successfully.'
    : 'Address created successfully.';
  const action = initialData ? 'Save changes' : 'Create';
  const defaultValues = initialData
    ? transformAddressToFormData(initialData)
    : {
        address_line1: '',
        address_line2: '',
        city: '',
        zipCode: '',
        state: '',
        country: '',
        type: undefined,
        primaryPhone: '',
        secondaryPhone: '',
        isDefault: false
      };

  const form = useForm<FormValues>({
    resolver: zodResolver(initialData ? updateFormSchema : createFormSchema),
    defaultValues
  });

  const onSubmit = async (data: FormValues) => {
    startTransition(() => {
      (async () => {
        try {
          const response = initialData
            ? await update(initialData.id, data)
            : await create(data);

          if (response.statusCode === 200) {
            toast({
              title: 'success',
              variant: 'destructive',
              description: toastMessage
            });
            form.reset();
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
            router.replace('/dashboard/address');
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
                name="address_line1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Address Line 1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address_line2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Address Line 2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Zip Code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="State"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={EAddressType.COMPANY}>
                            Company
                          </SelectItem>
                          <SelectItem value={EAddressType.BILLING}>
                            Billing
                          </SelectItem>
                          <SelectItem value={EAddressType.SHIPPING}>
                            Shipping
                          </SelectItem>
                          <SelectItem value={EAddressType.CUSTOMER}>
                            Customer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="primaryPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Primary Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Secondary Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Default</FormLabel>
                    <FormControl>
                      <Select
                        disabled={loading}
                        onValueChange={(val: string) => {
                          field.onChange(val === 'true');
                        }}
                        value={field.value ? 'true' : 'false'}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
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
                onClick={() => router.push('/dashboard/user')}
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
