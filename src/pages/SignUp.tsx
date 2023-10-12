// todo: prevent css from propagating to children in slide
// todo: extend Input to be a radio

import { Input } from "@/components/Input";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonInput,
} from "@ionic/react";
import React, { useState } from "react";
import {useForm, SubmitHandler} from "react-hook-form"
import {
    Swiper,
    SwiperSlide,
    useSwiper
} from 'swiper/react';


interface FormInputs {
    email: string;
    password: string;
}

const RoleSelect: React.FC = () => {
    const swiper = useSwiper();
    return (
	<>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			I am a teacher
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			I am a teacher
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonButton
		onClick={() => {swiper.slideNext();}}
		data-testid='role-select-continue-button'
	    >
		Continue
	    </IonButton>
	</>
    );
}

const LanguageModeSelect: React.FC = () => {
    const swiper = useSwiper();
    return (
	<>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			Spanish Immersion
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			Bilingual
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonButton
		onClick={() => {swiper.slideNext();}}
		data-testid='language-mode-continue-button'
	    >
		Continue
	    </IonButton>
	</>
    );
}

const LanguageInclusivitySelect: React.FC = () => {
    const swiper = useSwiper();
    return (
	<>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			Exclude gender neutral pronouns
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonCard>
		<IonCardHeader>
		    <IonCardTitle>
			Inclusive Language
		    </IonCardTitle>
		</IonCardHeader>
		<IonCardContent>
		</IonCardContent>
	    </IonCard>
	    <IonButton
		onClick={() => {swiper.slideNext();}}
		data-testid='language-inclusivity-continue-button'
	    >
		Continue
	    </IonButton>
	</>
    );
}


const AccountCredentials: React.FC = () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormInputs>(); // Provide type information for useForm
    const swiper = useSwiper();
    
    const onSubmit: SubmitHandler<FormInputs> = (data) =>  {
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
		{errors.email && <p>{errors.email.message}</p>}
		
		<Input
		    name="password"
		    control={control}
		    label="Password"
		    helperText="Create a password"
		    testId="account-credentials-password-input"
	            type="password"
		/>
		{errors.password && <p>{errors.password.message}</p>}
		
		<IonButton expand="block" type="submit" data-testid="account-credentials-continue-button">
		    Sign Up
		</IonButton>
            </form>
	</>
    );
}

const SignUp: React.FC = () => {
    return (
	<>
	    <h1>Welcome to Sign Up Page</h1>
	    <Swiper
		allowTouchMove={false}>
		<SwiperSlide data-testid='role-select-slide'>
		    <RoleSelect />
		</SwiperSlide>
		<SwiperSlide data-testid='account-credentials-slide'>
		    <AccountCredentials />
		</SwiperSlide>
		<SwiperSlide data-testid='language-mode-slide'>
		    <LanguageModeSelect />
		</SwiperSlide>
		<SwiperSlide data-testid='language-inclusivity-slide'>
		    <LanguageInclusivitySelect />
		</SwiperSlide>
	    </Swiper>
	</>
    )
  };

export default SignUp;
