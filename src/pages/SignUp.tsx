import { Input } from "@/components/Input";
import {
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
  } from "@ionic/react";
  import React, { useState } from "react";
  import {useForm} from "react-hook-form"
  
  const SignUp: React.FC = () => {

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<{email: string; password: string;}>();

  
    const onSubmit = (data: { email: string; password: string }) => {
      console.log("Email: ", data.email);
      console.log("Password: ", data.password);
      // signup logic here
    };
  
    return (
      <>
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
              helperText="Create a password"
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