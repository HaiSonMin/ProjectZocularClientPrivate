import { IUser } from '@/interfaces/models';
import { JWT } from '@auth/core/jwt';
import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & IUser;

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends ExtendedUser {}
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      feturbulence: React.SVGProps<SVGFETurbulenceElement>;
    }
  }
}

declare module '@tanstack/table-core' {
  interface FilterFns {
    dateBetweenFilterFn: FilterFn<unknown>;
    statusFilterFn: FilterFn<unknown>;
  }
}
