import React from 'react';
import { locales } from '../../../i18n';
import { useIntl } from 'react-intl';

interface LanguageSwitcherProps {
  onLocaleChange: (newLocale: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = (props) => {
  const intl = useIntl(); // Use the useIntl hook to access the current locale

  const handleChangeLocale = (newLocale: string) => {
    // Call the function passed from the parent (App.js) to change the app's locale
    props.onLocaleChange(newLocale);
    // console.log(newLocale);
  };

  return (
    <div>
      <label htmlFor="language-select">Select a language:</label>
      <select
        id="language-select"
        onChange={(e) => handleChangeLocale(e.target.value)}
        value={intl.locale} // Set the current locale as the selected value
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

export default LanguageSwitcher;