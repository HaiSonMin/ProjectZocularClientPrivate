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
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '../ui/use-toast';
import { CompanyType } from '@/types/company';
import { Select, SelectContent, SelectItem, SelectValue } from '../ui/select';
import { SelectTrigger } from '../ui/select';
import Loading from '../ui/loading';
import { create, update } from '@/app/apis/models/company.apis';

const createFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  businessSpecialty: z
    .string()
    .min(1, { message: 'Business specialty is required' }),
  phone: z
    .string()
    .min(1, { message: 'Phone is required' })
    .regex(/^[0-9+\-\s()]+$/, { message: 'Invalid phone number format' }),
  fax: z.string().min(1, { message: 'Fax is required' }),
  type: z
    .enum(Object.values(CompanyType) as [string, ...string[]], {
      required_error: 'Type is required'
    })
    .optional(),
  address: z.string().min(1, { message: 'Address is required' })
});

const updateFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).optional(),
  businessSpecialty: z
    .string()
    .min(1, { message: 'Business specialty is required' })
    .optional(),
  phone: z
    .string()
    .min(1, { message: 'Phone is required' })
    .regex(/^[0-9+\-\s()]+$/, { message: 'Invalid phone number format' }),
  fax: z.string().min(1, { message: 'Fax is required' }).optional(),
  type: z
    .enum(Object.values(CompanyType) as [string, ...string[]], {
      required_error: 'Type is required'
    })
    .optional(),
  address: z.string().min(1, { message: 'Address is required' }).optional()
});

type CompanyFormValues = z.infer<
  typeof createFormSchema | typeof updateFormSchema
>;

interface CompanyFormProps {
  initialData: any | null;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const title = initialData ? 'Edit company' : 'Create company';
  const description = initialData ? 'Edit a company.' : 'Add a new company';
  const toastMessage = initialData
    ? 'Company updated successfully.'
    : 'Company created successfully.';
  const action = initialData ? 'Save changes' : 'Create';
  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        businessSpecialty: '',
        phone: '',
        fax: '',
        type: CompanyType.GROUP,
        address: ''
      };

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(initialData ? updateFormSchema : createFormSchema),
    defaultValues
  });

  async function onSubmit(data: CompanyFormValues) {
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
  }

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
                      <Input disabled={loading} placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessSpecialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Specialty</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Business Specialty"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fax</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Fax" {...field} />
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
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(CompanyType).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Address"
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
                onClick={() => router.push('/dashboard/company')}
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
