import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
  } from "@ionic/react";
  import React, { useState } from "react";
  import {useForm, Controller} from "react-hook-form"
  
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
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
              render={({ fieldState, field: {onChange, onBlur, ...rest} }) => (
                <IonInput 
                    className={`${fieldState.invalid && 'ion-invalid'} ${!fieldState.invalid  && 'ion-valid'} ${fieldState.isTouched && 'ion-touched'}`}
                    type="email"
                    labelPlacement="floating"
                    helperText="Enter a valid email"
                    errorText={fieldState.error?.message}
                    onIonInput={onChange}
                    onIonBlur={onBlur}
                    {...rest}
                 />
              )}
            />
          </IonItem>
          {errors.email && <p>{errors.email.message}</p>}
  
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <IonInput type="password" {...field} />
              )}
            />
          </IonItem>
          {errors.password && <p>{errors.password.message}</p>}
  
          <IonButton expand="block" type="submit">
            Sign Up
          </IonButton>
        </form>
      </>
    );
  };
  
  export default SignUp;