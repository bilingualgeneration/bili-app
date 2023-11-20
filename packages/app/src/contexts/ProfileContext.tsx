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
    setLocale: any;
    isNewUser: boolean;
};

const defaultState: profile = {
    locale: (localStorage.getItem('userLocale') as locale) || 'en', // Read from local storage or use a default value
    setLocale: () => {},
    isNewUser: false, // Default value, assuming the user is not new
};

const ProfileContext = createContext<profile>(defaultState);

export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const storedLocale = localStorage.getItem('userLocale');
    // @ts-ignore: todo fix
    const [locale, setLocaleState] = useState<locale>(storedLocale || defaultState.locale);
    const [isNewUser, setIsNewUser] = useState<boolean>(false);

    useEffect(() => {
        const storedUserStatus = localStorage.getItem('isNewUser');
        if (storedUserStatus === null) {
          // If there's no stored status, assume the user is new and set the flag
          setIsNewUser(true);
          localStorage.setItem('isNewUser', 'true');
        } else {
          // If the status is stored, parse it to a boolean
          setIsNewUser(JSON.parse(storedUserStatus));
        }
    }, []);

    const setLocale = (newLocale: locale) => {
        localStorage.setItem('userLocale', newLocale);
        // @ts-ignore: todo fix
        setLocaleState(newLocale);	
    };
	
    return (
        <>
            <ProfileContext.Provider
                value={{
		        // @ts-ignore: todo fix
                    locale,
                    setLocale,
                    isNewUser,
                }}
            >
                {children}
            </ProfileContext.Provider>
        </>
    );
}
