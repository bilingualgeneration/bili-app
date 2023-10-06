import React from 'react';
import {
    useAuth,
    useSigninCheck
} from 'reactfire';

import {
    IonButton
} from '@ionic/react';

import {
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

const signOut = (auth) => {
    auth.signOut();
};

const signIn = async (auth) => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
};

const Login: React.FC = () => {
    const auth = useAuth();
    const {status, data: signinResult} = useSigninCheck();

    if(status === 'loading'){
	return <>
	    loading
	</>;
    }
    
    const {signedIn, user} = signinResult;
    
    return (
	<>
	    {
		signedIn && "hello " + user.displayName
	    }
	    <IonButton
		onClick={() => {signIn(auth);}}
		disabled={signedIn}
	    >
		Sign In
	    </IonButton>
	    <IonButton onClick={() => {signOut(auth);}}
		disabled={!signedIn}
	    >
		Sign Out
	    </IonButton>
	</>
    );
};

export default Login;
