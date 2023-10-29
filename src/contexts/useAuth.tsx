import {
    createContext,
    Dispatch,
    JSX,
    SetStateAction,
    useContext,
    useState
} from 'react';

type AuthContextType = {
    isAuthed: boolean | null,
    setIsAuthed: Dispatch<SetStateAction<boolean | null>>
    setUser: (value: any) => void, // todo: create type for user
    user: any // todo: create type for user
}

const defaultState: AuthContextType = {
    isAuthed: false, // null means we don't know yet whether authed or not
    setIsAuthed: () => {},
    setUser: () => {},
    user: null,
};

const AuthContext = createContext<AuthContextType>(defaultState);
export const useAuth = () => useContext(AuthContext);

type AuthContextProviderProps = {
    children: JSX.Element
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const [isAuthed, setIsAuthed] = useState<boolean | null>(false);
    const [user, setUser] = useState<any>(null); // todo: create type for user
    return (
	<AuthContext.Provider
	    value={{
		isAuthed,
		setIsAuthed,
		user,
		setUser
	    }}
	>
	    {children}
	</AuthContext.Provider>
    );
}
