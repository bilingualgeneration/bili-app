import React from 'react';
import {
    IonSpinner
} from '@ionic/react';
import {
    Redirect
} from 'react-router';

import {
    useSigninCheck
} from 'reactfire';


const Splash: React.FC = () => {
    const {status, data: signinResult} = useSigninCheck();

    if(status === 'loading'){
	// still trying to communicate with Firebase
	// todo: make spinner larger
	// todo: center spinner on page
	return (
	    <>
		<IonSpinner name='circular'></IonSpinner>
	    </>
	);
    }

    const {signedIn, user} = signinResult;

    // todo: grab full user profile from firestore
    
    if(signedIn){
	// todo: redirect based on user account type
	return <Redirect to='/student-dashboard' />;
    }else{
	return <Redirect to='/login' />;
    }
};

export default Splash;

