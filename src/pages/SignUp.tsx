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
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form"; // Import useForm and SubmitHandler

// Define the form input type
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

  // Define the onSubmit handler with the correct type
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("Email: ", data.email);
    console.log("Password: ", data.password);

    // signup logic here
  };

  return (
    <>
      <h1>Welcome to Sign Up Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
            render={({ fieldState, field }) => ( // Provide type information for fieldState and field
              <IonInput
                className={`${fieldState.invalid && "ion-invalid"} ${
                  !fieldState.invalid && "ion-valid"
                } ${fieldState.isTouched && "ion-touched"}`}
                type="email"
                labelPlacement="floating"
                helperText="Enter a valid email"
                errorText={fieldState.error?.message}
                onIonInput={field.onChange}
                onIonBlur={field.onBlur}
                value={field.value}
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
            render={({ field }) => ( // Provide type information for field
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