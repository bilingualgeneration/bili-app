import React from 'react';
import {
    useAuth,
    useSigninCheck
} from 'reactfire';
import {
    IonButton
} from '@ionic/react';
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
    const loginSchema = z.object({
      email: z.string().email('ENTER a valid email'),
      password: z.string().min(5,'Password must be 5 or more characters long')
    });
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormInputs>({
      resolver: zodResolver(loginSchema)
    });

    if(status === 'loading'){
      return 
        <>
          loading
        </>;
    }
    
    const {signedIn, user} = signinResult;

    return (
	<>
	    {
		signedIn && "hello " + user.displayName
	    }

      <form onSubmit={handleSubmit(data => handleEmailPasswordSignIn(auth, data.email, data.password))}>
          <Input
              name="email"
              control={control}
              label="Email"
              labelPlacement="stacked"
              helperText="Enter a valid email"
              testId="email-login-test"
              type="email"
            />
          {errors.email && <p>{errors.email.message}</p>}

          <Input
              name="password"
              control={control}
              label="Password"
              labelPlacement="stacked"
              helperText="Create a password"
              testId="password-login-test"
	            type="password"
            />
          {errors.password && <p id="pw-err">{errors.password.message}</p>}
          <IonButton expand="block" type="submit" data-cy="login_auth" disabled={signedIn}>
            Login
          </IonButton>
          
          <IonButton
            onClick={() => {signInWithGoogle(auth);}}
            disabled={signedIn}
              >
            Sign In with Google
          </IonButton>
          <IonButton onClick={() => {signOut(auth);}}
            disabled={!signedIn}
              >
            Sign Out
          </IonButton>

      </form>
      <IonButton href='/sign-up'>
	  Don't have an account yet? Sign Up!
      </IonButton>
	</>
    );
};

export default Login;
