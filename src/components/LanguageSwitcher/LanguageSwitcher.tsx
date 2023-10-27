import React from 'react';
import {locales} from '@/components/I18nWrapper';
import {useProfile} from '@/contexts/ProfileContext';

interface LanguageSwitcherProps {
    onLocaleChange: (newLocale: string) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = (props) => {
    const {locale, setLocale} = useProfile();
    const handleChangeLocale = (newLocale: string) => {
	setLocale(newLocale);
    };
    
    return (
	<div>
	    <label htmlFor="language-select">Select a language:</label>
	    <select
		id="language-select"
		onChange={(e) => handleChangeLocale(e.target.value)}
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
