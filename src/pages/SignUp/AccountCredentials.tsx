// JC: removing account creation related code
// JC: this will be implemented elsewhere

import {
    IonButton,
    IonCheckbox,
    IonLabel,
} from '@ionic/react';

import {Input} from '@/components/Input';
import {useForm, SubmitHandler} from 'react-hook-form'

import {
    useSwiper
} from 'swiper/react';

import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useSignUpData} from '@/pages/SignUp/SignUpContext';

import "./AccountCredentials.css"

interface FormInputs {
    name: string;
    email: string;
    password: string;
}


// JC: cleaned up, will delete this block
/*
   const handleEmailPasswordSignUp = async (
   auth: Auth, 
   name: string,
   email: string, 
   password: string, 
   swiper: any) => {

   swiper.slideNext();

   try {        
   await createUserWithEmailAndPassword(auth, email, password);
   console.log("User signed up successfully: " , email)
   
   swiper.slideNext();
   } catch (error) {
   console.error("Error signing in with email and password:", error);
   }
   };
 */

// todo: expand Input to include checkbox

export const AccountCredentials: React.FC = () => {
    const {data, setData} = useSignUpData();
    const swiper = useSwiper();
    const credentialsSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('ENTER a valid email'),
        password: z.string().min(5,'Password must be 5 or more characters long'),
	//tos: z.boolean(), // todo: make this required to be true
	//marketingUpdates: z.boolean()
    });

    const {
      control,
      handleSubmit,
      formState: { errors, isValid},
    } = useForm<FormInputs>({
        mode: 'onChange',
        resolver: zodResolver(credentialsSchema)
    });

    const onSubmit = handleSubmit((response) => {
	setData({
	    ...data,
	    ...response
	});
	swiper.slideNext();
    });

    return (
	<>
        <form
            className="account-credentials"
            onSubmit={onSubmit}
        >
            <Input
                name="name"
                label='Your Name'
                labelPlacement='stacked'
                fill="outline"
                control={control}
                helperText=""
                testId="account-credentials-name-input"
                type="text"
            />

            <Input
                label='Your email address'
                labelPlacement='stacked'
                required={true}
                name="email"
                control={control}
                fill="outline"
                helperText=""
                testId="account-credentials-email-input"
                type="email"
            />

            <Input
                label='Password* (8+ characters)'
                labelPlacement='stacked'
                required={true}
                name="password"
                control={control}
                fill="outline"
                helperText=""
                testId="account-credentials-password-input"
                type="password"
            />

            <IonCheckbox
                labelPlacement="end"
                alignment="start"
                justify="start">
                <span className="checkbox-label">
                    Terms of Service. I agree to the Terms of Service. I have read and understand the Privacy Policy
                </span>
            </IonCheckbox>

            <IonCheckbox
                labelPlacement="end"
                alignment="start"
                justify="start">
                <span className="checkbox-label">
                    I want to receive marketing updates
                </span>
            </IonCheckbox>

                <IonButton 
                    expand="block" 
                    type="submit" 
                    data-testid="account-credentials-continue-button"
                    disabled={!isValid}
                >
                    Continue
                </IonButton>
        </form>
	</>
    );
}
