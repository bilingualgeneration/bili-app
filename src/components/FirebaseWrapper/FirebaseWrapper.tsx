import {
    FC,
    ReactNode
} from 'react';
import {AuthWrapper} from './AuthWrapper';
import {FirebaseAppProvider} from 'reactfire';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID
}

// todo: better typing?
export const FirebaseWrapper: React.FC<{children: ReactNode}> = ({
    children
}) => {
    return (
	<FirebaseAppProvider firebaseConfig={firebaseConfig}>
	    <AuthWrapper>
		{children}
	    </AuthWrapper>
	</FirebaseAppProvider>
    );
};
