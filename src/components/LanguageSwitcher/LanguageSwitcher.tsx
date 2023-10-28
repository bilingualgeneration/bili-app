import React from 'react';
import {locales} from '@/components/I18nWrapper';
import type {locale} from '@/components/I18nWrapper';
import {useProfile} from '@/contexts/ProfileContext';

export const LanguageSwitcher: React.FC<{}> = (props) => {
    const {locale, setLocale} = useProfile();
    const handleChangeLocale = (newLocale: locale) => {
	setLocale(newLocale);
    };
    
    return (
	<div>
	    <label htmlFor="language-select">Select a language:</label>
	    <select
		id="language-select"
		onChange={(e) => handleChangeLocale(e.target.value as locale)}
		value={locale} // Set the current locale as the selected value
	    >
		{locales.map((locale) => ( 
		    <option key={locale} value={locale}>
			{locale}
		    </option>
		))}
	    </select>
	</div>
    );
};
