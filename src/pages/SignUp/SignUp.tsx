// todo: prevent css from propagating to children in slide
// todo: extend Input to be a radio

import { Input } from '@/components/Input';
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
import React, { useState } from 'react';
import {useForm, SubmitHandler} from 'react-hook-form'
import {
    Swiper,
    SwiperSlide,
    useSwiper
} from 'swiper/react';
import {
    RoleSelect,
    AccountCredentials,
    LanguageModeSelect,
    LanguageInclusivitySelect
} from '@/pages/SignUp';

export const SignUp: React.FC = () => {
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
