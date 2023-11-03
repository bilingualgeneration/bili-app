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
    setLocale: Dispatch<SetStateAction<locale>>
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
    const [locale, setLocale] = useState<locale>(storedLocale || defaultState.locale);

    return (
        <>
            <ProfileContext.Provider
                value={{
                    locale,
                    setLocale
                }}>
                {children}
            </ProfileContext.Provider>
        </>
    );
}
