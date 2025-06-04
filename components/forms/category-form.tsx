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
import Loading from '../ui/loading';
import FileUpload from '../file-upload';
import {
  create,
  removeMulti,
  update
} from '@/app/apis/models/product-categories.apis';
import { toast } from '../ui/use-toast';
import { AlertModal } from '../modal/alert-modal';

const createFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  img: z.string().url({ message: 'Image must be a valid URL' }).optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true)
});

const updateFormSchema = z.object({
  name: z.string().optional(),
  img: z.string().url({ message: 'Image must be a valid URL' }).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional()
});

type CategoryFormValues = z.infer<
  typeof createFormSchema | typeof updateFormSchema
>;

interface CategoryFormProps {
  initialData: any | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const title = initialData ? 'Edit category' : 'Create category';
  const description = initialData ? 'Edit a category.' : 'Add a new category';
  const toastMessage = initialData
    ? 'Category updated successfully.'
    : 'Category created successfully.';
  const action = initialData ? 'Save changes' : 'Create';
  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        img: '',
        description: '',
        isActive: false
      };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(initialData ? updateFormSchema : createFormSchema),
    defaultValues
  });
  const [loading, startTransition] = useTransition();

  const onSubmit = async (data: CategoryFormValues) => {
    startTransition(() => {
      (async () => {
        try {
          const response = initialData
            ? await update(initialData.id, data)
            : await create(data);

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
            router.replace('/dashboard/category');
            toast({
              title: 'success',
              variant: 'destructive',
              description: 'Category deleted successfully'
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter category description"
                        {...field}
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

              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image category</FormLabel>
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
            </div>
            <div className="flex items-center justify-start gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/category')}
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
