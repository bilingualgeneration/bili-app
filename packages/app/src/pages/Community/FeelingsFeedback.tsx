import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { I18nMessage } from "@/components/I18nMessage";
import { RadioCard } from "@/components/RadioCard";
import { IonButton, IonCard, IonText } from "@ionic/react";
import HappyBilli from "@/assets/icons/bili_happy.svg";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useI18n } from "@/hooks/I18n";

export const FeelingsFeedback: React.FC = () => {
  const history = useHistory();
  const { getText } = useI18n();
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
          title={getText("common.feeling.happy", 1, "authed")}
          subTitle={getText("common.feeling.happy", 2, "authed")}
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
          title={getText("common.feeling.calm", 1, "authed")}
          subTitle={getText("common.feeling.calm", 2, "authed")}
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
          title={getText("common.feeling.sad", 1, "authed")}
          subTitle={getText("common.feeling.sad", 2, "authed")}
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
          title={getText("common.feeling.terrible", 1, "authed")}
          subTitle={getText("common.feeling.terrible", 2, "authed")}
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
          title={getText("common.feeling.other", 1, "authed")}
          subTitle={getText("common.feeling.other", 2, "authed")}
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
          <IonText className="ion-text-start">
            <h2 className="text-3xl semibold color-suelo padding-left-4">
              <I18nMessage id="common.howYouFeel" />
            </h2>
            <I18nMessage
              id="common.howYouFeel"
              level={2}
              wrapper={(text: string) => (
                <p className="text-3xl color-grey padding-left-4">{text}</p>
              )}
            />
          </IonText>
          <ExtendedRadio
            control={control}
            name="feelingsFeedback"
            displayCardsInRow={true}
            isMaxWidthNeeded={true}
            maxWidth="14.5rem"
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
function getText(
  arg0: string,
  arg1: number,
  arg2: string,
): string | import("react-intl").MessageFormatElement[] {
  throw new Error("Function not implemented.");
}
