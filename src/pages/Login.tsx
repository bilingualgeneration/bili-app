import {
    IonButton,
    IonCard,
    IonCardContent,
    IonText
} from '@ionic/react';


// @ts-ignore todo: cannot find module or its corresponding type declarations
import AppleIcon from '@/assets/icons/apple.svg?react';
// @ts-ignore todo: cannot find module or its corresponding type declarations
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
    const auth = useAuth();
    const {status, data: signinResult} = useSigninCheck();
    const schema = z.object({
	email: z.string()
		.email('ENTER a valid email'),
	password: z.string()
		   .min(5)
    });
    const {
	control,
	handleSubmit,
	formState: {isValid},
    } = useForm<FormInputs>({
	resolver: zodResolver(schema)
    });



    return (
	<>
	    <IonCard>
		<IonCardContent>
		    <div className='ion-margin-top'>
			<Input
			label='Email address'
			labelPlacement='above'
			required={true}
			name="email"
			control={control}
			fill="outline"
			helperText=""
			testId="account-credentials-email-input"
			type="email"
			/>
		    </div>

		    <div className='ion-margin-top'>
			<Input
			label='Password'
			labelPlacement='above'
			required={true}
			name="password"
			control={control}
			fill="outline"
			helperText=""
			testId="account-credentials-password-input"
			type="password"
			/>
		    </div>

		    <div>
			divider component goes here
		    </div>
		    
		    <IonButton
			color='medium'
			className='ion-margin-top'
			disabled
			expand='block'
			fill='outline'
			style={{opacity: 0.2}}>
			<GoogleIcon style={{marginRight: '1rem'}} /> Continue with Google
		    </IonButton>

		    <IonButton
			color='medium'
			className='ion-margin-top'
			disabled
			expand='block'
			fill='outline'
			style={{opacity: 0.2}}>
			<AppleIcon style={{marginRight: '1rem'}} /> Continue with Apple
		    </IonButton>
		    <div className='ion-margin-top'>
			<IonButton 
			    data-testid='account-credentials-continue-button'
			    disabled={!isValid}
			    expand='block' 
			    shape='round'
			    type='submit'>
			    Continue
			</IonButton>
		    </div>

		    <div className='ion-text-center ion-margin-top'>
			<IonText color='medium'>
			    Don't have an account? <IonText>Sign up (make me a link)</IonText>
			</IonText>
		    </div>
		</IonCardContent>
	    </IonCard>
	</>
    );
};

export default Login;
