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
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoginSchema } from '@/lib/schemas';
import { login } from '@/services/actions/login';

type UserFormValue = z.infer<typeof LoginSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const urlError =
    searchParams?.get('error') === 'OAuthAccountNotLinked'
      ? 'You are currently using an email from a different provider!'
      : '';
  const form = useForm<UserFormValue>({
    resolver: zodResolver(LoginSchema)
  });

  const onSubmit = async (values: UserFormValue) => {
    startTransition(async () => {
      setError('');
      startTransition(async () => {
        try {
          const result = await login(values, callbackUrl);
          if (result?.error) {
            form.reset();
            setError(result.error);
            return;
          }

          if (result?.success) {
            form.reset();
          }
        } catch (err) {
          setError('An error occurred!');
        }
      });
    });
  };

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
