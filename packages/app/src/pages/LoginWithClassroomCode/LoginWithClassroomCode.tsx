import { ErrorMessages } from "@/components/ErrorMessages";
import { getFunctions, httpsCallable } from "firebase/functions";
import { I18nMessage } from "@/components/I18nMessage";
import { Input } from "@/components/Input";
import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import { UnauthedHeader } from "@/components/UnauthedHeader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useOldProfile } from "@/hooks/OldProfile";
import { useState } from "react";
import { z } from "zod";

export const LoginWithClassroomCode: React.FC = () => {
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setClassroom } = useOldProfile();
  const history = useHistory();
  const functions = getFunctions();
  const findClassroomByClassroomCode = httpsCallable(
    functions,
    "classroom-findByClassroomCode",
  ); // TODO: change find to only validate
  const schema = z.object({
    classroomCode: z.string(),
  });
  const {
    control,
    handleSubmit,
    formState: {},
    watch,
  } = useForm<z.infer<typeof schema>>();
  const onSubmit = handleSubmit(async ({ classroomCode }) => {
    setIsLoading(true);
    const { data } = await findClassroomByClassroomCode({
      classroomCode: classroomCode.toLowerCase(),
    });
    setIsLoading(false);
    if (data === null) {
      setErrors(["invalidClassCode"]);
    } else {
      // @ts-ignore
      history.push(`/classroom/student-select/${data!.id}`);
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
              disabled={isLoading}
              fill="outline"
              labelPlacement="floating"
              name={"classroomCode"}
              required={true}
              maxlength={8}
            />
            <ErrorMessages
              className="margin-top-1"
              errors={errors}
              languageSource="unauthed"
            />
            <IonButton
              className="margin-top-2"
              disabled={isLoading}
              type="submit"
            >
              <I18nMessage id="common.continue" languageSource="unauthed" />
            </IonButton>
          </form>
        </IonCardContent>
      </IonCard>
    </>
  );
};
