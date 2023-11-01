import {IntlProvider} from 'react-intl';
import {
    PropsWithChildren,
    useEffect,
    useState,
}from 'react';

import {useProfile} from '@/contexts/ProfileContext';

import {
    createIntl,
    createIntlCache,
    IntlShape
} from 'react-intl';

// import default from start
// instead of waiting for it to load
import en from './lang/en.json';

export const locales = {
    'en': 'English',
    'es': 'Spanish',
    'es-inc': 'Spanish Inclusive'
};

export type locale = 'en' | 'es' | 'es-inc';

// needed to trick react-intl to trick it into supporting inclusive versions of languages
const localeMap: {[key in locale]?: locale} = {
    'es-inc': 'es'
}

export const I18nWrapper = ({children}: PropsWithChildren<{}>) => {
    const {locale} = useProfile();

    const cache = createIntlCache();
    const intl: IntlShape = createIntl(
	{ locale: 'en', messages: en },
	cache
    );
    const [translations, setTranslations] = useState(intl.messages);
    // console.log('This is the initial lang:', intl.messages)

    useEffect(() => {
        console.log("Now you should be switching to: ", locale);  //debug stmt
	    readTranslations(locale).then((newTranslations) => {
	        setTranslations(newTranslations);
            // console.log('This would be the new translations:', newTranslations);
	    });
    }, [locale]);

    const translationsCache: any = {
	'en': en // default lang
    };

    const readTranslations = async (locale: string) => {
	if (translationsCache[locale]) {
	    return translationsCache[locale];
	}
	
	try {
	    const translations = await import(`./lang/${locale}.json`);
	    translationsCache[locale] = translations;
        // console.log('The translations should be for:', locale);
	    return console.log('These are the translations:', translations);
	} catch (error) {
	    console.error(`Translations for ${locale} not found.`);
	}
    }
    
    return (
        <>
            <IntlProvider
                locale={localeMap[locale] || locale}
                messages={translations}>
                {children}
            </IntlProvider>
        </>
    );
}
