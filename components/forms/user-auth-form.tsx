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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoginSchema } from '@/lib/schemas';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { login } from '@/app/apis/auth';

type UserFormValue = z.infer<typeof LoginSchema>;

export default function UserAuthForm() {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(LoginSchema)
  });

  async function onSubmit(values: UserFormValue) {
    startTransition(async () => {
      try {
        const response = await login(values);

        if (response?.statusCode === 200 && response?.metadata) {
          router.replace('/dashboard');
          toast({
            title: 'success',
            variant: 'destructive',
            description: response?.message
          });
        } else {
          toast({
            title: 'error',
            variant: 'destructive',

            description: response?.message
          });
        }
      } catch (error: any) {
        toast({
          title: 'error',
          variant: 'destructive',

          description: 'Có lỗi xảy ra, vui lòng thử lại'
        });
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder="Enter your email..."
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwork</FormLabel>
                <FormControl>
                  <Input
                    type="Password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Continue With Email
          </Button>
        </form>
      </Form>
    </>
  );
}
