import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from 'react';

import type {locale} from '@/components/I18nWrapper';

export type profile = {
    locale: locale,
    //setLocale: Dispatch<SetStateAction<locale>>
    setLocale: any
}

const defaultState: profile = {
    locale: (localStorage.getItem('userLocale') as locale) || 'en', // Read from local storage or use a default value
    setLocale: () => {}
};

const ProfileContext = createContext<profile>(defaultState);

export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({children}: PropsWithChildren<{}>) => {
    const storedLocale = localStorage.getItem('userLocale');
    // @ts-ignore: todo fix
    const [locale, setLocaleState] = useState<locale>(storedLocale || defaultState.locale);

    const setLocale = (newLocale: locale) => {
	localStorage.setItem('userLocale', newLocale);
    // @ts-ignore: todo fix
	setLocaleState(newLocale);	
    }
	
    return (
        <>
            <ProfileContext.Provider
                value={
		// @ts-ignore: todo fix
		{
                    locale,
                    setLocale
                }}>
                {children}
            </ProfileContext.Provider>
        </>
    );
}
