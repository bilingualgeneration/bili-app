import React from 'react';
import {locales} from '@/components/I18nWrapper';
import type {locale} from '@/components/I18nWrapper';
import {useProfile} from '@/contexts/ProfileContext';
import {Select} from '@/components/Select';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import type {SelectOption} from '@/components/Select';
import {
    useForm
} from 'react-hook-form';

export const LanguageSwitcher: React.FC<{}> = (props) => {
    const {locale, setLocale} = useProfile();
	// console.log('Current Locale:', locale); // Debug statement
    const schema = z.object({
	locale: z.string()
    });
    type schemaType = z.infer<typeof schema>;
    const {
	control
    } = useForm<schemaType>({
	defaultValues: {
	    locale
	},
	mode: 'onChange',
	resolver: zodResolver(schema)
    });

    const changeLanguage = (newLocale: locale) => {
        // Update the locale in the context
        setLocale(newLocale);
    
        // Persist the user's language choice to storage
        localStorage.setItem('userLocale', newLocale);
      };
    
    return (
		<>
            <Select
				changeLanguage ={changeLanguage}
                control={control}
                interface='popover'
                label='mode'
                name='locale'
                options={Object.keys(locales).map((l: string) => ({
                    value: l,
                    label: locales[l as keyof typeof locales]
                }))}
            />
        </>
    );
};
