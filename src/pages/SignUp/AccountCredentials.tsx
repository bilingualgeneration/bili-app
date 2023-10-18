import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonInput,
    IonRadioGroup,
    IonRadio,
    IonAlert,
} from '@ionic/react';

import {Input} from '@/components/Input';
import {useForm, SubmitHandler} from 'react-hook-form'

import {
    useSwiper
} from 'swiper/react';

import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Auth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc
} from 'firebase/firestore';
import {
    useAuth,
    useSigninCheck
} from 'reactfire';
import { useState } from 'react';

interface FormInputs {
    name: string;
    email: string;
    password: string;
}

const handleEmailPasswordSignUp = async (
    auth: Auth, 
    name: string,
    email: string, 
    password: string, 
    swiper: any) => {
    try {
        
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully: " , email)
   
        swiper.slideNext();
    } catch (error) {
        console.error("Error signing in with email and password:", error);
    }
  };

export const AccountCredentials: React.FC = () => {
    const auth = useAuth();
    const {status, data: signinResult} = useSigninCheck();
    const loginSchema = z.object({
        name: z.string().min(1, 'Name is required'),
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

    const swiper = useSwiper();
    const [showAlert, setShowAlert] = useState(false);

    if(status === 'loading'){
        return 
          <>
            loading
          </>;
      }

   

    return (
	<>
        <form onSubmit={handleSubmit(data => handleEmailPasswordSignUp(auth, data.name, data.email, data.password, swiper))}>
            <Input
                name="name" 
                control={control}
                label="Your name"
                labelPlacement="stacked"
                helperText=""
                testId="account-credentials-name-input"
                type="text"
            />
            {errors.name && <p>{errors.name.message}</p>}
            <Input
                name="email"
                control={control}
                label="Your email address*"
                labelPlacement="stacked"
                helperText=""
                testId="account-credentials-email-input"
                type="email"
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
                name="password"
                control={control}
                label="Password* (8+ characters)"
                labelPlacement="stacked"
                helperText=""
                testId="account-credentials-password-input"
                type="password"
            />
            {errors.email && <p>{errors.email.message}</p>}

            <IonRadioGroup>
                <IonItem>
                    <IonRadio value="option1">Terms of Service. I agree to the Terms of Service. I have read and understand the Privacy Policy</IonRadio>
                </IonItem>
            </IonRadioGroup>

            <IonRadioGroup>
                <IonItem>
                    <IonRadio value="option2">I want to receive marketing updates</IonRadio>
                </IonItem>
            </IonRadioGroup>

            {/* Alert UI component to show error */}
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Alert'}
                message={'You must agree to the Terms of Service to continue.'}
                buttons={['OK']}
            />

            <IonButton expand="block" type="submit" data-testid="account-credentials-continue-button">
                Continue
            </IonButton>
        </form>
	</>
    );
}
