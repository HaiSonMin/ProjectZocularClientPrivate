'use client';
import { useAuthStore } from '@/app/stores/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function UserNav() {
  const session = {
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      image: 'https://example.com/johndoe.jpg'
    }
  };
  const { user } = useAuthStore();

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-12 rounded-full">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={session.user?.image ?? ''}
                alt={session.user?.name ?? ''}
              />
              <AvatarFallback>{user?.firstName}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );
  }
}
