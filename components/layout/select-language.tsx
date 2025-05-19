'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Language } from '@/i18n/request';
import { useTransition } from 'react';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';
import clsx from 'clsx';
import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';
export default function SelectLanguage() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('language');

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={clsx(
          'rounded-sm p-2 transition-colors',
          isPending && 'pointer-events-none opacity-60'
        )}
        asChild
      >
        <Button variant="outline" size="icon">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange(Language.VI)}>
          {t('vi')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange(Language.EN)}>
          {t('en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
