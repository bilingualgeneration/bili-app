import { Input } from "@/components/Input";
import {
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
  } from "@ionic/react";
  import React, { useState } from "react";
  import {useForm, SubmitHandler} from "react-hook-form"
  
  interface FormInputs {
    email: string;
    password: string;
  }

  const SignUp: React.FC = () => {
    
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormInputs>(); // Provide type information for useForm
  

    const onSubmit: SubmitHandler<FormInputs> = (data) =>  {
      console.log("Email: ", data.email);
      console.log("Password: ", data.password);
      // signup logic here
    };
  
    return (
      <>
        <h1>Welcome to Sign Up Page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
              name="email"
              control={control}
              label="Email"
              helperText="Enter a valid email"
              testId="email-signup-test"
            />
          {errors.email && <p>{errors.email.message}</p>}

          <Input
              name="password"
              control={control}
              label="Password"
              helperText="Create a password"
              testId="password-signup-test"
	      type="password"
            />
          {errors.password && <p>{errors.password.message}</p>}
  
          <IonButton expand="block" type="submit" routerLink="/student-dashboard" data-cy="sign_up_auth">
            Sign Up
          </IonButton>
        </form>
      </>
    );
  };

export default SignUp;
