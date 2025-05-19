import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from './locale';
export const LOCALE = 'NEXT_LOCALE';
export enum Language {
  VI = 'vi',
  EN = 'en'
}

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale: 'vi',
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
