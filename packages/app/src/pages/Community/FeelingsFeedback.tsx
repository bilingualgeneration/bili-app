import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { I18nMessage } from "@/components/I18nMessage";
import { RadioCard } from "@/components/RadioCard";
import { IonButton, IonCard, IonText } from "@ionic/react";
import HappyBilli from "@/assets/icons/bili_happy.svg";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

export const FeelingsFeedback: React.FC = () => {
  const history = useHistory();
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm();
  const happyOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={"Feliz"}
          subTitle={"Happy"}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#FFE24F"
          maxHeight="17.5rem"
        />
      </div>
    ),
    value: "happy",
  };

  const calmOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={"Tranquilo/a/e"}
          subTitle={"Calm"}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#C3ECE2"
          maxHeight="17.5rem"
        />
      </div>
    ),
    value: "calm",
  };
  const sadOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={"Triste"}
          subTitle={"Sad"}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#8FB8FA"
          maxHeight="17.5rem"
        />
      </div>
    ),
    value: "sad",
  };
  const terribleOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={"Fatal"}
          subTitle={"Terrible"}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#FF8B70"
          maxHeight="17.2rem"
        />
      </div>
    ),
    value: "terrible",
  };
  const otherOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={"Otro sentimiento"}
          subTitle={"Other feeling"}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#F28AC9"
          maxHeight="17.5rem"
        />
      </div>
    ),
    value: "other",
  };

  const onSubmit = handleSubmit((data) => {
    history.push("/community/congrats");
  });

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
                <p className="text-3xl color-grey">{text}</p>
              )}
            />
          </IonText>
          <ExtendedRadio
            control={control}
            name="feelingsFeedback"
            displayCardsInRow={true}
            isMaxWidthNeeded={true}
            options={[
              happyOption,
              calmOption,
              sadOption,
              terribleOption,
              otherOption,
            ]}
          />

          <IonButton
            data-testid="addclassroom-notification-method-continue-button"
            disabled={!isValid}
            shape="round"
            type="button"
            onClick={onSubmit}
          >
            <IonText className=" padding-right-5 padding-left-5">
              <h2 className="text-3xl semibold color-base">
                <I18nMessage id="common.next" />
              </h2>

              <I18nMessage
                id="common.next"
                level={2}
                wrapper={(text: string) => (
                  <p className="text-sm color-base">{text}</p>
                )}
              />
            </IonText>
          </IonButton>
        </form>
      </IonCard>
    </>
  );
};
