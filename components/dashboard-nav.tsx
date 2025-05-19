'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  if (!items?.length) {
    return null;
  }

  const handleParentItemClick = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight'];
          const ChevronIcon = Icons['chevronDown'];
          const renderParentItem = (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div>
                  <Link
                    href={item.disabled ? '/' : item.href || '#'}
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      path === item.href ? 'bg-accent' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    onClick={() => {
                      if (item.subItems) {
                        handleParentItemClick(index);
                      }
                      if (setOpen) setOpen(false);
                      if (item.onClick) item.onClick();
                    }}
                  >
                    <Icon className={`ml-3 size-5 flex-none`} />
                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : null}
                    {item.subItems && (
                      <ChevronIcon
                        className={cn(
                          'ml-auto transform transition-transform',
                          openSubMenu === index ? 'rotate-180' : ''
                        )}
                      />
                    )}
                  </Link>
                </div>
              </TooltipTrigger>
              <TooltipContent
                align="center"
                side="right"
                sideOffset={8}
                className={!isMinimized ? 'hidden' : 'inline-block'}
              >
                {item.title}
              </TooltipContent>
            </Tooltip>
          );

          const renderSubItems = item.subItems && openSubMenu === index && (
            <div className="ml-6 mt-2 space-y-2">
              {item.subItems.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subItem.href || '#'}
                  className={cn(
                    'flex items-center gap-2 rounded-md py-2 pl-4 text-sm hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          );

          return (
            <div key={index}>
              {renderParentItem}
              {renderSubItems}
            </div>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
