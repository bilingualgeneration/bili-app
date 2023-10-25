import {
    createContext,
    useContext,
    useState
} from 'react';

const SignUpDataContext = createContext({
    data: {}
});
export const useSignUpData = () => useContext(SignUpDataContext);

export const SignUpDataProvider = ({children}) => {
    const [data, setData] = useState({});
    return (
	<SignUpDataContext.Provider
	    value={{
		data,
		setData
	    }}
	>
	{children}
	</SignUpDataContext.Provider>
    );
}
