//A.M.
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonItem,
  IonInput,
  IonText,
  IonToggle,
} from "@ionic/react";
import Letter from "@/assets/icons/letter.svg?react";
import Printer from "@/assets/icons/printer.svg?react";
import Star from "@/assets/icons/puprle_star.svg?react";
import { useIntl, FormattedMessage } from "react-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { useForm } from "react-hook-form";
import { RadioCard } from "../../components/RadioCard";
import { ExtendedRadioOption, ExtendedRadio } from "@/components/ExtendedRadio";
import { Popover } from "@/components/Popover";
import { useProfile } from "@/hooks/Profile";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/components/Firebase";
import { useHistory } from "react-router";
import "./InviteCaregivers.scss";

export const InviteCaregivers: React.FC = () => {
  const { data, setData, pushPage } = useSignUpData();
  const history = useHistory();
  const { control, handleSubmit, setValue, reset } = useForm();

  const emailOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={<Letter />}
          title={"By email"}
          content={
            "I want to email student caregivers with instructions to sign up"
          }
          iconBackgroundColor="#D3EAE8"
        />
      </div>
    ),
    value: "",
  };

  const emailAndFlyerOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={<Star />}
          badge={"RECOMMENDED"}
          title={"Both email and flyer"}
          content={
            "I want to email student caregivers and send students home with print out instructions for their caregivers to sign up"
          }
          iconBackgroundColor="#FFD8EB"
        />
      </div>
    ),
    value: "",
  };

  const flyerOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={<Printer />}
          title={"By print out flyer"}
          content={
            "I want to send students home with print out instructions for their caregivers to sign up"
          }
          iconBackgroundColor="#FFF3D3"
        />
      </div>
    ),
    value: "",
  };

  const onSubmit = handleSubmit((responses) => {
    setData({
      ...data,
      ...responses,
    });

    history.push("/classrooms");
  });

  return (
    <div id="invite-caregivers-page">
      <IonCard style={{ maxWidth: 580, margin: "auto", marginTop: "24px" }}>
        <form className="radio-button-select">
          <IonText className="ion-text-center">
            <h3 className="text-3xl semibold color-suelo">
              You’ve created your class!
            </h3>
            <p className="text-xl semibold color-suelo margin-top-2 invite-caregivers-text">
              Invite student caregivers to download the app
            </p>
          </IonText>
          <ExtendedRadio
            control={control}
            name="isImmersive"
            options={[emailOption, flyerOption, emailAndFlyerOption]}
          />

          <IonButton
            data-testid="caregiver-select-continue-button"
            //disabled={!isValid}
            shape="round"
            type="button"
            onClick={onSubmit}
          >
            <FormattedMessage
              id="common.continue"
              defaultMessage="Continue"
              description="Button label to continue"
            />
          </IonButton>
        </form>
      </IonCard>
    </div>
  );
};
