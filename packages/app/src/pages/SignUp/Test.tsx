import { IonButton } from "@ionic/react";
import { useSignUpData } from "./SignUpContext";

export const Test: React.FC = () => {
  const { signUp } = useSignUpData();
  return (
    <IonButton
      onClick={() => {
        signUp();
      }}
    >
      Test
    </IonButton>
  );
};
