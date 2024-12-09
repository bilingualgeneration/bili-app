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
} from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";

import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import "./ClassCode.scss";
import { Input } from "@/components/Input";

export const ClassCode: React.FC = () => {
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
  });
  const { data, setData, pushPage } = useSignUpData();
  const [hasError, setHasError] = useState<boolean>(false);

  const inputs = ["code0", "code1", "code2", "code3"];
  const values = watch();

  const onSubmit = handleSubmit((responses) => {
    setData({
      ...data,
      ...responses,
    });
    // @ts-ignore todo: better typing

    if (values.code0 && values.code1 && values.code2 && values.code3) {
      const isValidCode =
        values.code0 === "1" &&
        values.code1 === "2" &&
        values.code2 === "3" &&
        values.code3 === "4";
      if (!isValidCode) {
        setHasError(true);
      } else {
        setHasError(false);
        pushPage("accountCredentials");
      }
    } else {
      setHasError(false);
    }
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
                      <FormattedMessage
                        id="signUpParent.classCode"
                        defaultMessage="What’s your class code?"
                      />
                    </h2>
                    <p className="text-lg" style={{ marginTop: "0.75rem" }}>
                      <FormattedMessage
                        id="signUpParent.classCodeAsk"
                        defaultMessage="Don’t know your class code? Ask a teacher"
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
                      <FormattedMessage
                        id="signUpParent.classCodeError"
                        defaultMessage="Wrong class code. Try again!"
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
          disabled={!allFieldsFilled}
        >
          <FormattedMessage
            id="common.continue"
            description="Button label to continue"
          />
        </IonButton>
      </form>
    </>
  );
};
