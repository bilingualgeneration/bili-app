import {
    createContext,
    PropsWithChildren,
    useContext,
    useState
} from 'react';

const SignUpDataContext = createContext({
    data: {},
    setData: (value: any): void => {}
});
export const useSignUpData = () => useContext(SignUpDataContext);

export const SignUpDataProvider = ({children}: PropsWithChildren<{}>) => {
    const [data, setData] = useState({});
    return (
	<SignUpDataContext.Provider
	    value={{
		data,
		setData
	    }}>
	    {children}
	</SignUpDataContext.Provider>
    );
}
