import { getFunctions, httpsCallable } from "firebase/functions";
import { I18nMessage } from "@/components/I18nMessage";
import { Input } from "@/components/Input";
import {
  IonButton,
  IonLabel,
  IonItem,
  IonInput,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
} from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./ClassCode.scss";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const ClassCode: React.FC = () => {
  const { data, setData, pushPage } = useSignUpData();
  const query = useQuery();
  // TODO: proper error checking
  const code = query.get("code") ?? "";
  const email = query.get("email");
  useEffect(() => {
    if (email) {
      setData({
        ...data,
        email,
      });
    }
  }, [email]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const intl = useIntl();
  const schema = z.object({
    code0: z.string(),
    code1: z.string(),
    code2: z.string(),
    code3: z.string(),
  });
  const {
    control,
    handleSubmit,
    formState: {},
    watch,
  } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      code0: code === "" ? "" : code[0].toUpperCase(),
      code1: code === "" ? "" : code[1].toUpperCase(),
      code2: code === "" ? "" : code[2].toUpperCase(),
      code3: code === "" ? "" : code[3].toUpperCase(),
    },
  });
  const [hasError, setHasError] = useState<boolean>(false);
  const functions = getFunctions();
  const findByCodeFunction = httpsCallable(functions, "classroom-findByCode");

  const inputs = ["code0", "code1", "code2", "code3"];
  const values = watch();

  const onSubmit = handleSubmit(async (responses) => {
    const enteredCode = Object.values(responses).join("");
    setIsLoading(true);
    const { data: classes } = await findByCodeFunction({
      code: Object.values(responses).join(""),
    });
    if (classes === null) {
      setHasError(true);
    } else {
      setHasError(false);
      setData({
        ...data,
        // @ts-ignore
        classroomId: classes![0].id, // assume that we only take the first class by code
        role: "caregiver",
      });
      pushPage("languageModeSelect");
    }
    setIsLoading(false);
  });

  const allFieldsFilled =
    values.code0 && values.code1 && values.code2 && values.code3;

  return (
    <>
      <form className="">
        <IonCard
          id="class-code-styles"
          style={{
            cursor: "pointer",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <div className="">
            <div className="">
              <IonCardHeader class="custom-ion-header margin-bottom-3">
                <IonCardTitle>
                  <IonText className="ion-text-center">
                    {/* todo: don't force type cast */}
                    <h2 className="text-3xl semibold color-suelo">
                      <I18nMessage
                        id="signUpParent.classCode"
                        languageSource="unauthed"
                      />
                    </h2>
                    <p className="text-lg" style={{ marginTop: "0.75rem" }}>
                      <I18nMessage
                        id="signUpParent.classCodeAsk"
                        languageSource="unauthed"
                      />
                    </p>
                  </IonText>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {/* input fields for class code */}
                <div className="digit-wrapper">
                  {inputs.map((name) => (
                    <div className="digit-window" key={name}>
                      <Input
                        className="custom-input-style"
                        control={control}
                        fill="outline"
                        labelPlacement="floating"
                        name={name}
                        required={true}
                        errorText=""
                        maxlength={1}
                      />
                    </div>
                  ))}
                </div>
                {/* error message for wrong input code */}
                {hasError && (
                  <IonText color="danger" className="ion-text-center">
                    <p>
                      <I18nMessage
                        id="signUpParent.classCodeError"
                        languageSource="unauthed"
                      />
                    </p>
                  </IonText>
                )}
              </IonCardContent>
            </div>
          </div>
        </IonCard>

        <IonButton
          className="margin-vertical-3"
          shape="round"
          expand="block"
          type="button"
          onClick={onSubmit}
          data-testid="role-select-continue-button"
          disabled={!allFieldsFilled || isLoading}
        >
          <I18nMessage id="common.continue" languageSource="unauthed" />
        </IonButton>

        {isLoading && <IonProgressBar type="indeterminate" />}
      </form>
    </>
  );
};
