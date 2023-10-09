import React, { useState } from 'react';
import {
  IonInput,
  IonButton,
  IonRouterLink,
} from '@ionic/react';
import {useAuth} from '../contexts/useAuth';
import {useHistory} from 'react-router-dom';
import {useForm, SubmitHandler} from "react-hook-form"
import { Input } from '@/components/Input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


interface FormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  
  const loginSchema = z.object({
    email: z.string().email('Enter a valid email').nonempty('Email is required'),
    password: z.string().nonempty('Password is required')
  });

    const {setIsAuthed} = useAuth();
    const history = useHistory();
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormInputs>({
      resolver: zodResolver(loginSchema)
    }); // Provide type information for useForm
  

    const onSubmit: SubmitHandler<FormInputs> = (data) =>  {
      setIsAuthed(true);
	    history.push('/student-dashboard'); // this is a programmatic redirect
	    // not always best to use, but sometimes necessary
      console.log("Email: ", data.email);
      console.log("Password: ", data.password);
      // login logic here
    };

  const handleTeacherSelected = () => {
    // Handle teacher selection here
    // You can navigate to the teacher login page or perform any other action
  };

  return (
    <>
      {/* Content of the login page */}
      <h1>Welcome to the Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Input
              name="email"
              control={control}
              label="Email"
              helperText="Enter a valid email"
              testId="email-login-test"
              type="email"
            />
          {errors.email && <p>{errors.email.message}</p>}

          <Input
              name="password"
              control={control}
              label="Password"
              helperText="Create a password"
              testId="password-login-test"
	            type="password"
            />
          {errors.password && <p>{errors.password.message}</p>}
  
          <IonButton expand="block" type="submit" data-cy="login_auth">
            Login
          </IonButton>
        </form>

      {/* Add a link to the password reset page */}
      <IonRouterLink id="reset-password-link" routerLink="/reset-password">
        Forgot Password?
      </IonRouterLink>

      {/* Teacher login link displayed from the beginning next to 'Forgot Password?' */}
      <IonRouterLink routerLink="/teacher-login">I'm a teacher</IonRouterLink>

    </>
  );
};

export default Login;

