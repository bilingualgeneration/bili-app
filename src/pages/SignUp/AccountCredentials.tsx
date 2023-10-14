import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonInput,
} from '@ionic/react';

import {Input} from '@/components/Input';
import {useForm, SubmitHandler} from 'react-hook-form'

import {
    useSwiper
} from 'swiper/react';

interface FormInputs {
    email: string;
    password: string;
}

export const AccountCredentials: React.FC = () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm(); // Provide type information for useForm
    const swiper = useSwiper();

    const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) =>  {
      console.log("Email: ", data.email);
      console.log("Password: ", data.password);
	// signup logic here
	swiper.slideNext();
    };
  
    return (
	<>
            <form onSubmit={handleSubmit(onSubmit)}>
		<Input
		    name="email"
		    control={control}
		    label="Email"
		    helperText="Enter a valid email"
		    testId="account-credentials-email-input"
		    type="email"
		/>
		
		<Input
		    name="password"
		    control={control}
		    label="Password"
		    helperText="Create a password"
		    testId="account-credentials-password-input"
	            type="password"
		/>
		
		<IonButton expand="block" type="submit" data-testid="account-credentials-continue-button">
		    Sign Up
		</IonButton>
            </form>
	</>
    );
}
