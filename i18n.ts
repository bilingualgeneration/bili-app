import { createIntl, createIntlCache, IntlShape } from 'react-intl';

// Define the supported locales
const locales: string[] = ['en', 'es', 'es-inc'];

// Set the default locale
const defaultLocale: string = 'es';

// Create a cache object for translations
const translationsCache: { [locale: string]: Promise<Record<string, string>> } = {};

// Function to read JSON translations for a specific locale
async function readTranslations(locale: string) {
  if (await translationsCache[locale]) {
    return translationsCache[locale];
  }
  
  try {
    const translations = await import(`./lang/${locale}.json`);
    translationsCache[locale] = translations;
    return translations;
  } catch (error) {
    console.error(`Translations for ${locale} not found.`);
  }
  
  return {};
}

// Create a cache and an intl object to handle formatting of dates, numbers, and messages based on locale (caches results of formatting options)
const cache = createIntlCache();
const intl: IntlShape = createIntl(
  { locale: defaultLocale, messages: await readTranslations(defaultLocale) },
   cache
);

export { locales, defaultLocale, intl };


