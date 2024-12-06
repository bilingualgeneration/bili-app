import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { I18nMessage } from "@/components/I18nMessage";
import { RadioCard } from "@/components/RadioCard";
import { IonButton, IonCard, IonText } from "@ionic/react";
import HappyBilli from "@/assets/icons/bili_happy.svg";

import { useForm } from "react-hook-form";

export const CommunityCongrats: React.FC = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm();
  const emailOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={"Feliz"}
          content={"Happy"}
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
        />
      </div>
    ),
    value: "happy",
  };

  const emailAndFlyerOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={"Tranquilo/a/e"}
          content={"Calm"}
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
        />
      </div>
    ),
    value: "calm",
  };

  return (
    <>
      <IonCard style={{ textAlign: "center" }}>
        <form action="">
          <IonText className="ion-text-center">
            <h2 className="text-3xl semibold color-suelo">
              <I18nMessage id="common.howYouFeel" />
            </h2>
            <I18nMessage
              id="common.howYouFeel"
              level={2}
              wrapper={(text: string) => (
                <p className="text-3xl color-nube">{text}</p>
              )}
            />
          </IonText>
          <ExtendedRadio
            control={control}
            name="notificationMethod"
            displayCardsInRow={true}
            options={[
              emailAndFlyerOption,
              emailOption,
              emailAndFlyerOption,
              emailOption,
              emailAndFlyerOption,
            ]}
          />

          <IonButton
            data-testid="addclassroom-notification-method-continue-button"
            disabled={!isValid}
            shape="round"
            type="button"
          >
            <I18nMessage id="common.next" />
          </IonButton>
        </form>
      </IonCard>
    </>
  );
};
