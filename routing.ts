import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pt', 'fr', 'es', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'never',
});
