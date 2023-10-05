import React, { useState } from 'react';
import {
  IonInput,
  IonButton,
  IonRouterLink,
} from '@ionic/react';
import './Login.css'; // For future CSS
import UserTypePopover from './UserTypePopover'; // Import UserTypePopover component
import {useAuth} from '../contexts/useAuth';
import {useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form"
import { Input } from "@/components/Input";


const Login: React.FC = () => {

  const {setIsAuthed} = useAuth();
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{email: string; password: string;}>();

  const onSubmit = (data: { email: string; password: string }) => {
    // login logic here
    setIsAuthed(true);
    history.push('/student-dashboard'); // this is a programmatic redirect
    // not always best to use, but sometimes necessary
    };

  return (
    <>
      {/* Content of the login page */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          name="email"
          control={control}
          label="Email"
          helperText="Enter a valid email"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Input 
          name="password"
          control={control}
          label="Password"
          helperText="Enter a valid password" 
        />
        {errors.email && <p>{errors.email.message}</p>}
        <IonButton expand="block" routerLink="/student-dashboard" className="login-button">
          Login
        </IonButton>
      </form>

      {/* Add a link to the password reset page */}
      <IonRouterLink id="reset-password-link" routerLink="/reset-password">
        Forgot Password?
      </IonRouterLink>

      {/* Teacher login link displayed from the beginning next to 'Forgot Password?' */}
      <IonRouterLink routerLink="/teacher-login">
        I'm a teacher
      </IonRouterLink>
    </>
  );
};

export default Login;

