import {
    createContext,
    useContext,
    useState
} from 'react';

const defaultState = {
    isAuthed: false, // null means we don't know yet whether authed or not
    user: null
};

const AuthContext = createContext(defaultState);
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}) => {
    const [isAuthed, setIsAuthed] = useState(false);
    const [user, setUser] = useState(null);
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
