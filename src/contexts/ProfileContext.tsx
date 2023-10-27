import {
    createContext,
    PropsWithChildren,
    useContext,
    useState
} from 'react';

export type profile = {
    locale: 'en' | 'es' | 'es-inc'
}

const defaultState: profile = {
    locale: 'en',
    setLocale: (locale: string): void => {}
};

const ProfileContext = createContext(defaultState);
export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({children}): PropsWithChildren<{}> => {
    const [locale, setLocale] = useState<profile.locale>(defaultState.locale);
    return (
	<ProfileContext.Provider
	    value={{
		locale,
		setLocale
	    }}>
	    {children}
	</ProfileContext.Provider>
    );
}
