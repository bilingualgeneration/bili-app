import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { I18nMessage } from "@/components/I18nMessage";
import { Input } from "@/components/Input";
import {
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonRadio,
  IonRadioGroup,
  IonList,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const ChildProfile: React.FC = () => {
  const { data, setData, pushPage } = useSignUpData();

  const schema = z.object({
    childName: z.string().min(1).max(50).optional(),
    childAge: z.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const ageOptions: ExtendedRadioOption[] = [
    {
      component: (
        <div>
          <IonRadio mode="md" labelPlacement="end">
            <IonText>
              <p className="text-xl color-suelo">
                <I18nMessage
                  id="childProfile.age.lessThan3"
                  languageSource="unauthed"
                />
              </p>
            </IonText>
          </IonRadio>
        </div>
      ),
      value: "<3",
    },
    {
      component: (
        <div>
          <IonRadio mode="md" labelPlacement="end">
            <IonText>
              <p className="text-xl color-suelo">
                <I18nMessage
                  id="childProfile.age.3to5"
                  languageSource="unauthed"
                />
              </p>
            </IonText>
          </IonRadio>
        </div>
      ),
      value: "3-5",
    },
    {
      component: (
        <div>
          <IonRadio mode="md" labelPlacement="end">
            <IonText>
              <p className="text-xl color-suelo">
                <I18nMessage
                  id="childProfile.age.5to7"
                  languageSource="unauthed"
                />
              </p>
            </IonText>
          </IonRadio>
        </div>
      ),
      value: "5-7",
    },
    {
      component: (
        <div>
          <IonRadio mode="md" labelPlacement="end">
            <IonText>
              <p className="text-xl color-suelo">
                <I18nMessage
                  id="childProfile.age.above7"
                  languageSource="unauthed"
                />
              </p>
            </IonText>
          </IonRadio>
        </div>
      ),
      value: ">7",
    },
  ];

  const onSubmit = handleSubmit((response) => {
    setData({
      ...data,
      ...response,
    });
    pushPage("languageModeSelect");
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="ion-padding-bottom">
          <IonText className="ion-text-center">
            <h2 className="text-3xl semibold color-suelo">
              <I18nMessage id="childProfile.title" languageSource="unauthed" />
            </h2>
            <p className="text-xl color-suelo">
              <I18nMessage
                id="childProfile.subtitle"
                languageSource="unauthed"
              />
            </p>
          </IonText>
        </div>
        <br />
        <div>
          <IonText>
            <p className="text-xl color-suelo">
              <I18nMessage
                id="childProfile.nameLabel"
                languageSource="unauthed"
              />
            </p>
          </IonText>
          <Input
            control={control}
            name="childName"
            type="text"
            labelPlacement="floating"
          />
        </div>

        <br />
        <div className="ion-margin-top">
          <IonText>
            <p className="text-xl color-suelo">
              <I18nMessage
                id="childProfile.ageLabel"
                languageSource="unauthed"
              />
            </p>
          </IonText>
        </div>

        <IonRadioGroup>
          <ExtendedRadio
            control={control}
            name="childAge"
            options={ageOptions}
            testId="child-age-radio-group"
          />
        </IonRadioGroup>

        <IonButton
          className="margin-top-2"
          data-testid="account-credentials-continue-button"
          disabled={!isValid}
          expand="block"
          shape="round"
          type="submit"
        >
          <I18nMessage id="common.continue" languageSource="unauthed" />
        </IonButton>
      </form>
    </>
  );
};
