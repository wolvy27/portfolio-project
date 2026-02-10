import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // Supported locales
    locales: ['en', 'fr'],

    // Default locale
    defaultLocale: 'en'
});

// Navigation wrappers
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
