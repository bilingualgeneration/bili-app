import {
    FC,
    ReactNode
} from 'react';
import {
    AuthProvider,
    FirestoreProvider,
    useFirebaseApp
} from 'reactfire';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

export const FirebaseFeaturesWrapper: FC<{children: ReactNode}> = ({
    children
}) => {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    return(
	<AuthProvider sdk={auth}>
	    <FirestoreProvider sdk={firestore}>
		{children}
	    </FirestoreProvider>
	</AuthProvider>
    );
};
