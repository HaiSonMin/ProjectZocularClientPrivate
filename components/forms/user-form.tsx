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
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import { AdminStatus, Gender, Roles, UserStatus } from '@/types/user';
import Loading from '../ui/loading';
import { create } from '@/app/apis/models/users.apis';
import { EGender } from '@/enums/models/EGender.enum';

const createFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(1, { message: 'Mobile is required' }),
    birthdate: z
      .string()
      .nonempty({ message: 'Birthdate is required' }) // Không được để trống
      .regex(/^\d{2}-\d{2}-\d{4}$/, {
        message: 'Birthdate must be in dd-mm-yyyy format'
      })
      .refine((val) => !isNaN(Date.parse(val.split('-').reverse().join('-'))), {
        message: 'Invalid date'
      }),

    address: z.string().min(1, { message: 'Address is required' }),

    role: z.enum(Roles.map((r) => r.value) as [string, ...string[]], {
      required_error: 'Role is required'
    }),

    licenseNumber: z
      .string()
      .min(1, { message: 'License Number is required' })
      .optional()
      .or(z.literal('')),
    licenseState: z
      .string()
      .min(1, { message: 'License State is required' })
      .optional()
      .or(z.literal('')),

    gender: z.nativeEnum(EGender, {
      required_error: 'Gender is required',
      invalid_type_error: 'Invalid gender value'
    }),

    isBlocked: z.boolean({
      required_error: 'Blocked flag is required',
      invalid_type_error: 'Blocked flag must be a boolean'
    }),

    isRootAdmin: z.boolean({
      required_error: 'RootAdmin flag is required',
      invalid_type_error: 'RootAdmin flag must be a boolean'
    }),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Confirm password is required' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

  .transform(({ confirmPassword, ...rest }) => rest);

const updateFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(1, { message: 'Mobile is required' }),
    birthdate: z
      .string()
      .nonempty({ message: 'Birthdate is required' }) // Không được để trống
      .regex(/^\d{2}-\d{2}-\d{4}$/, {
        message: 'Birthdate must be in dd-mm-yyyy format'
      })
      .refine((val) => !isNaN(Date.parse(val.split('-').reverse().join('-'))), {
        message: 'Invalid date'
      }),

    address: z.string().min(1, { message: 'Address is required' }),

    role: z.enum(Roles.map((r) => r.value) as [string, ...string[]], {
      required_error: 'Role is required'
    }),

    licenseNumber: z.string().min(1, { message: 'License Number is required' }),
    licenseState: z.string().min(1, { message: 'License State is required' }),

    gender: z.nativeEnum(EGender, {
      required_error: 'Gender is required',
      invalid_type_error: 'Invalid gender value'
    }),

    isBlocked: z.boolean({
      required_error: 'Blocked flag is required',
      invalid_type_error: 'Blocked flag must be a boolean'
    }),

    isRootAdmin: z.boolean({
      required_error: 'RootAdmin flag is required',
      invalid_type_error: 'RootAdmin flag must be a boolean'
    }),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Confirm password is required' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

  .transform(({ confirmPassword, ...rest }) => rest);

type UserFormValues = z.infer<
  typeof createFormSchema | typeof updateFormSchema
>;

interface UserFormProps {
  initialData: any | null;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, startTransition] = useTransition();

  const title = initialData ? 'Edit user' : 'Create user';
  const description = initialData ? 'Edit a user.' : 'Add a new user';
  const toastMessage = initialData
    ? 'User updated successfully.'
    : 'User created successfully.';
  const action = initialData ? 'Save changes' : 'Create';
  if (initialData) {
    initialData.birthdate = initialData.birthdate.toString();
  }
  const defaultValues = initialData
    ? initialData
    : {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthdate: '',
        avatar: '',
        licenseNumber: '',
        licenseState: '',
        isRootAdmin: false,
        password: '',
        confirmPassword: '',
        gender: 'male',
        role: 'customer',
        isBlocked: false,
        address: ''
      };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(initialData ? updateFormSchema : createFormSchema),
    defaultValues
  });

  async function onSubmit(data: UserFormValues) {
    startTransition(() => {
      (async () => {
        try {
          console.log('data', data);

          const response = await create(data);

          console.log('response', response);

          // You may want to handle the response here, e.g. show a toast or redirect
        } catch (error: any) {
          toast({
            title: 'error',
            variant: 'destructive',
            description: 'Có lỗi xảy ra, vui lòng thử lại'
          });
        }
      })();
    });
  }

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-8 md:grid-cols-3">
              {/* First Name */}
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="First name"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Last name"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="Email"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Password"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Confirm Password"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Mobile"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Birthdate */}
              <FormField
                name="birthdate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthdate</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Birthdate"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Gender?.map((item, index) => (
                            <SelectItem value={item.key} key={index}>
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={
                          field.value !== undefined
                            ? field.value.toString()
                            : ''
                        }
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {Roles.map((role, index) => (
                            <SelectItem key={index} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* License Number */}
              <FormField
                name="licenseNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="License Number"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* License State */}
              <FormField
                name="licenseState"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License State</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="License State"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Is Blocked */}
              <FormField
                name="isBlocked"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blocked</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                        value={
                          field.value !== undefined
                            ? field.value.toString()
                            : ''
                        }
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {UserStatus.map((status, index) => (
                            <SelectItem
                              key={index}
                              value={status.value.toString()}
                            >
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Is Root Admin */}
              <FormField
                name="isRootAdmin"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                        value={field.value.toString()}
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {AdminStatus.map((status, index) => (
                            <SelectItem
                              key={index}
                              value={status.value.toString()}
                            >
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Avatar URL */}
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Address"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard/user')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {action}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};
