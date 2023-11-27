import {DividerText} from '@/components/DividerText';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonText
} from '@ionic/react';
import { useIntl, FormattedMessage } from 'react-intl';
import {userSchema} from '@bili/schema/user';

import AppleIcon from '@/assets/icons/apple.svg?react';
import GoogleIcon from '@/assets/icons/google.svg?react';

import React from 'react';
import {
    useAuth,
    useSigninCheck
} from 'reactfire';
import {useForm, SubmitHandler} from "react-hook-form"
import { Input } from '@/components/Input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Auth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword, 
    getAuth
} from 'firebase/auth';


const signOut = (auth: { isAuthed?: boolean; user?: null; signOut?: any; }) => {
    auth.signOut();
};

const signInWithGoogle = async (auth: Auth) => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
};

const handleEmailPasswordSignIn = async (auth: Auth, email: string, password: string) => {
    try {
	await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
	console.error("Error signing in with email and password:", error);
    }
};


interface FormInputs {
    email: string;
    password: string;
}

const Login: React.FC = () => {
	//uncomment when will be implementing Firebase Auth
    // const auth = useAuth();
    // const {status, data: signinResult} = useSigninCheck();
	const intl = useIntl();
    const {
	control,
	handleSubmit,
	formState: {isValid},
    } = useForm<FormInputs>({
	mode: 'onBlur',
	resolver: zodResolver(userSchema)
    });



    return (
		<>
			<IonCard>
				<IonCardContent>
					<div className='ion-margin-top'>
						<Input
						label={intl.formatMessage({ id: 'login.email', defaultMessage: 'Email address', description: 'User must enter their email on login screen' })}
						labelPlacement='above'
						required={true}
						name="email" 
						control={control}
						fill="outline"
						helperText=""
						testId="login-email-input"
						type="email"
						/>
					</div>

					<div className='ion-margin-top'>
						<Input
						label={intl.formatMessage({ id: 'login.password', defaultMessage: 'Password', description: 'User must enter their password on login screen' })}
						labelPlacement='above'
						required={true}
						name="password"
						control={control}
						fill="outline"
						helperText=""
						testId="login-password-input"
						type="password"
						/>
					</div>

					<DividerText
					className='ion-margin-top'
					text={intl.formatMessage({ id: 'login.divider', defaultMessage: 'or login using', description: 'User who is teacher has option to login using Google or Apple' })}
					/>
					
					<IonButton
						color='medium'
						className='ion-margin-top'
						disabled
						expand='block'
						fill='outline'
						style={{opacity: 0.2}}>
					    <span style={{marginRight: '1rem'}}>
						<GoogleIcon />
					    </span> <FormattedMessage id="login.google" defaultMessage="Continue with Google" />
					</IonButton>

					<IonButton
						color='medium'
						className='ion-margin-top'
						disabled
						expand='block'
						fill='outline'
						style={{opacity: 0.2}}>
					    <span style={{marginRight: '1rem'}}>
						<AppleIcon />
					    </span>
						<FormattedMessage id="login.apple" defaultMessage="Continue with Apple" />
					</IonButton>

					<div className='ion-margin-top'>
						<IonButton 
							data-testid='account-credentials-continue-button'
							disabled={!isValid}
							expand='block' 
							shape='round'
							type='submit'>
							<FormattedMessage id="login.continue" defaultMessage="Continue" />
						</IonButton>
					</div>

					<div className='ion-text-center ion-margin-top'>
						<IonText color='medium'>
							<FormattedMessage id="login.noAccount" defaultMessage="Don't have an account?" /> <IonText> <a href='/sign-up'><FormattedMessage id="login.signUp" defaultMessage="Sign Up" /></a></IonText>
						</IonText>
					</div>
				</IonCardContent>
			</IonCard>
		</>
    );
};

export default Login;
