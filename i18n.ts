import { createIntl, createIntlCache, IntlShape } from 'react-intl';

// Define the supported locales
const locales: string[] = ['en', 'es', 'es-inc'];

// Set the default locale
const defaultLocale: string = 'en';

// Function to read JSON translations for a specific locale
function readTranslations(locale: string) {
  try {
    return require(`./lang/${locale}.json`);
  } catch (error) {
    console.error(`Translations for ${locale} not found.`);
  }
  return {};
}

// Create a cache and an intl object
const cache = createIntlCache();
const intl: IntlShape = createIntl({ locale: defaultLocale, messages: readTranslations(defaultLocale) }, cache);

export { locales, defaultLocale, intl };


