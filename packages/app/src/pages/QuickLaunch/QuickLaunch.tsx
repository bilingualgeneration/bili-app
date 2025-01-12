// TODO: update for future user system
import { ErrorMessages } from "@/components/ErrorMessages";
import { getFirebaseAuth } from "@/components/Firebase";
import { I18nMessage } from "@/components/I18nMessage";
import { Input } from "@/components/Input";
import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UnauthedHeader } from "@/components/UnauthedHeader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";
import { useState } from "react";
import { z } from "zod";

import "./QuickLaunch.scss";

const lookup: { [key: string]: string } = {
  "40GR": "2GrKmIhSZYglRYEXFbXB",
  OPUT: "EDIfJEx5QQZxYHsT9ixW",
  V5QU: "eGmlbVHHFxYI2tlzd037",
  GI6E: "CfApuZE3f9blBoG8G1pV",
};

export const QuickLaunch: React.FC = () => {
  const auth = getFirebaseAuth();
  const [errors, setErrors] = useState<string[] | null>(null);
  const { quickLaunchFlag, setQuickLaunchFlag } = useProfile();
  const history = useHistory();
  const schema = z.object({
    code: z.string(),
  });

  const {
    control,
    handleSubmit,
    formState: {},
    watch,
  } = useForm<z.infer<typeof schema>>();
  const onSubmit = handleSubmit(async (data) => {
    const code = data.code.toUpperCase();
    if (lookup[code]) {
      setErrors(null);
      setQuickLaunchFlag(true);
      signInWithEmailAndPassword(
        auth,
        `${lookup[code]}@thebiliapp.com`,
        lookup[code],
      );
    } else {
      setErrors(["invalidClassCode"]);
    }
  });
  return (
    <>
      <UnauthedHeader
        backButtonOnClick={() => {
          history.push("/");
        }}
      />
      <IonCard style={{ maxWidth: "75%", margin: "auto" }}>
        <IonCardContent className="ion-text-center">
          <IonText>
            <h1 className="text-4xl margin-bottom-1">
              <I18nMessage
                id="splash.classCodeButton"
                languageSource="unauthed"
              />
            </h1>
          </IonText>
          <form onSubmit={onSubmit}>
            <Input
              control={control}
              className="quicklaunch-input"
              fill="outline"
              labelPlacement="floating"
              name={"code"}
              required={true}
              maxlength={4}
            />
            <ErrorMessages
              className="margin-top-1"
              errors={errors}
              languageSource="unauthed"
            />
            <IonButton className="margin-top-2" type="submit">
              <I18nMessage id="common.continue" languageSource="unauthed" />
            </IonButton>
          </form>
        </IonCardContent>
      </IonCard>
    </>
  );
};
