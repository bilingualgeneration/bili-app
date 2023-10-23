// Define the supported locales
const locales = ['en', 'es', 'es-inc'];

// Set the default locale
const defaultLocale = 'en';

// Define message translations for each locale
const messages = {
  en: {
    intruderWelcome: 'Welcome to Intruder Page',
    explore: 'Explore',
    home: 'Home',
    // Add more translations for English...
  },
  es: {
    intruderWelcome: 'Bienvenidos a la página de Intruso',
    explore: 'Explorar',
    home: 'Inicio',
    // Add more translations for Spanish...
  },
  es_inc: {
    intruderWelcome: 'Bienvenid@s a la página de Intruso',
    explore: 'Explorar',
    home: 'Inicio',
    // Add more translations for Spanish Inclusive...
  },
};

// Function to flatten the nested messages
const flattenMessages = (nestedMessages: Record<string, string>) => {
  const flatMessages: Record<string, string> = {};
  for (const key in nestedMessages) {
    flatMessages[key] = nestedMessages[key];
  }
  return flatMessages;
};

// Transform the nested messages to a flat structure
const flatMessages = flattenMessages(messages[defaultLocale]);

export { locales, defaultLocale, flatMessages };

