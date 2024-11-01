import { FormattedMessage, useIntl } from "react-intl";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Input } from "@/components/Input";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const waitlistSchema = z.object({
  email: z.string(),
  name: z.string(),
  role: z.string().optional(),
  schoolName: z.string().optional(),
  zipcode: z.string().optional(),
});

type Waitlist = z.infer<typeof waitlistSchema>;

export const Waitlist: React.FC = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const functions = getFunctions();
  const waitlistFunction = httpsCallable(functions, "waitlist-add");
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Waitlist>({
    mode: "onBlur",
    resolver: zodResolver(waitlistSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await waitlistFunction(data);
    setLoading(false);
    setSubmitted(true);
  });
  return (
    <div className="content-wrapper" style={{ maxWidth: 580, margin: "auto" }}>
      <IonCard>
        <IonCardContent>
          <form onSubmit={onSubmit}>
            <IonText>
              <h1 className="text-3xl color-suelo">
                <FormattedMessage id="waitlist.title" />
              </h1>
              <p>
                <FormattedMessage id="waitlist.explainer" />
              </p>
            </IonText>
            <br />
            <Input
              control={control}
              disabled={loading || submitted}
              label={intl.formatMessage({ id: "common.fullName" })}
              labelPlacement="above"
              required={true}
              name="name"
              fill="outline"
            />
            <br />
            <Input
              control={control}
              disabled={loading || submitted}
              label={intl.formatMessage({ id: "common.email" })}
              labelPlacement="above"
              required={true}
              name="email"
              fill="outline"
              type="email"
            />
            <br />
            <Input
              control={control}
              disabled={loading || submitted}
              label={intl.formatMessage({ id: "waitlist.schoolName" })}
              labelPlacement="above"
              required={false}
              name="schoolName"
              fill="outline"
            />
            <br />
            <Input
              control={control}
              disabled={loading || submitted}
              label={intl.formatMessage({ id: "waitlist.zipcode" })}
              labelPlacement="above"
              required={false}
              name="zipcode"
              fill="outline"
            />
            <br />
            <Input
              control={control}
              disabled={loading || submitted}
              helperText={intl.formatMessage({ id: "waitlist.roleHelper" })}
              label={intl.formatMessage({ id: "waitlist.role" })}
              labelPlacement="above"
              required={false}
              name="role"
              fill="outline"
            />
            <IonButton
              className="margin-vertical-3"
              disabled={loading || submitted}
              expand="block"
              shape="round"
              type="submit"
            >
              <FormattedMessage id="common.continue" />
            </IonButton>
            {loading && (
              <div className="ion-text-center">
                <IonSpinner name="dots" />
              </div>
            )}
            {submitted && (
              <IonText>
                <p>
                  <FormattedMessage id="waitlist.thankYou" />
                </p>
              </IonText>
            )}
          </form>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
