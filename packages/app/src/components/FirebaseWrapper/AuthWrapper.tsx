import {
    FC,
    ReactNode
} from 'react';
import {
    AuthProvider,
    useFirebaseApp
} from 'reactfire';
import {getAuth} from 'firebase/auth';

export const AuthWrapper: FC<{children: ReactNode}> = ({
    children
}) => {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    return(
	<AuthProvider sdk={auth}>
	    {children}
	</AuthProvider>
    );
};
