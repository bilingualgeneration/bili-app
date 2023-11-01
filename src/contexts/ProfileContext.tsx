import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState
} from 'react';

import type {locale} from '@/components/I18nWrapper';

export type profile = {
    locale: locale,
    setLocale: Dispatch<SetStateAction<locale>>
}

const defaultState: profile = {
    locale: 'en',
    setLocale: () => {}
};

const ProfileContext = createContext<profile>(defaultState);
export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [locale, setLocale] = useState<locale>(defaultState.locale);
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
