import { createIntl, createIntlCache, IntlShape } from 'react-intl';

// Define the supported locales
const locales: string[] = ['en', 'es', 'es-inc'];

// Set the default locale
const defaultLocale: string = 'en';

// Function to read JSON translations for a specific locale
async function readTranslations(locale: string) {
  try {
    return await import(`./lang/${locale}.json`);
  } catch (error) {
    console.error(`Translations for ${locale} not found. ${error}`);
  }
  return {};
}

// Create a cache and an intl object
const cache = createIntlCache();
const intl: IntlShape = createIntl({ locale: defaultLocale, messages: await readTranslations(defaultLocale) }, cache);

export { locales, defaultLocale, intl };


