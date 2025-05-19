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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import companyApi from '@/services/api/modules/company-api';
import { Company, CompanyStatus, CompanyType } from '@/types/company';
import { Select, SelectContent, SelectItem, SelectValue } from '../ui/select';
import { SelectTrigger } from '../ui/select';
import isValidObjectId from '@/helper/isValidObjectId';
import Loading from '../ui/loading';
const createFormSchema = z.object({
  owner_id: z
    .string()
    .min(1, { message: 'Owner is required' })
    .refine((value) => isValidObjectId(value), { message: 'Invalid owner ID' }),
  name: z.string().min(1, { message: 'Name is required' }),
  bussiness_specialty: z
    .string()
    .min(1, { message: 'Business specialty is required' }),
  type: z.enum(Object.values(CompanyType) as [string, ...string[]], {
    required_error: 'Type is required'
  }),
  parent_company_id: z
    .string()
    .optional()
    .refine((value) => value !== undefined && isValidObjectId(value), {
      message: 'Invalid parent company ID'
    }),
  website_url: z.string().min(1, { message: 'Website URL is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  fax: z.string().min(1, { message: 'Fax is required' }),
  status: z.enum(Object.values(CompanyStatus) as [string, ...string[]], {
    required_error: 'Status is required'
  })
});
const updateFormSchema = z.object({
  owner_id: z
    .string()
    .optional()
    .refine((value) => value !== undefined && isValidObjectId(value), {
      message: 'Invalid owner ID'
    }),
  name: z.string().optional(),
  bussiness_specialty: z.string().optional(),
  type: z
    .enum(Object.values(CompanyType) as [string, ...string[]], {
      required_error: 'Type is required'
    })
    .optional(),
  parent_company_id: z
    .string()
    .optional()
    .refine((value) => value !== undefined && isValidObjectId(value), {
      message: 'Invalid parent company ID'
    }),
  website_url: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  status: z
    .enum(Object.values(CompanyStatus) as [string, ...string[]], {
      required_error: 'Status is required'
    })
    .optional()
});

type CompanyFormValues = z.infer<
  typeof createFormSchema | typeof updateFormSchema
>;

interface CompanyFormProps {
  initialData: any | null;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit company' : 'Create company';
  const description = initialData ? 'Edit a company.' : 'Add a new company';
  const toastMessage = initialData
    ? 'Company updated successfully.'
    : 'Company created successfully.';
  const action = initialData ? 'Save changes' : 'Create';
  const defaultValues = initialData
    ? initialData
    : {
        owner_id: undefined,
        name: undefined,
        bussiness_specialty: undefined,
        type: CompanyType.PROFESSIONAL,
        parent_company_id: undefined,
        website_url: undefined,
        email: undefined,
        phone: undefined,
        fax: undefined,
        status: CompanyStatus.ACTIVE
      };

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(initialData ? updateFormSchema : createFormSchema),
    defaultValues
  });

  const onSubmit = async (data: CompanyFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        const { response } = await companyApi.updateCompany(
          initialData._id,
          data as Company
        );
        console.log('response', response);
      } else {
        await companyApi.createCompany(data as Company);
      }
      router.refresh();
      router.push(`/dashboard/company`);
      toast({
        variant: 'default',
        title: toastMessage,
        description: toastMessage
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error?.message ?? 'There was a problem with your request.'
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
                name="owner_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Owner"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="bussiness_specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business specialty</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Business specialty"
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
                        <FormItem>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type" />
                              <SelectContent>
                                {Object.values(CompanyType).map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectTrigger>
                          </FormControl>
                        </FormItem>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parent_company_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent company</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Parent company"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Website URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Email"
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormItem>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                              <SelectContent>
                                {Object.values(CompanyStatus).map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectTrigger>
                          </FormControl>
                        </FormItem>
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
