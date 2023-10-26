import React from 'react';
import { FormattedMessage } from 'react-intl';
import { locales, defaultLocale, intl } from '../../../i18n';

const Intruder: React.FC = () => {
    return (
        <>
            <h1>
                <FormattedMessage id="intruderWelcome" defaultMessage="Welcome to Intruder Page" />
            </h1>
            {/* Additional content here */} 
        </>
    );
}

export default Intruder;