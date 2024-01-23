import { FormattedMessage, useIntl } from "react-intl";
import { httpsCallable } from "firebase/functions";
import { IonButton, IonGrid, IonRow, IonCol } from "@ionic/react";
import { Input } from "@/components/Input";
import { useMaskito } from "@maskito/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFunctions } from "reactfire";
import { useProfile } from "@/contexts/ProfileContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./Profile.css";

export const Profile: React.FC = () => {
  const intl = useIntl();
  const schema = z.object({
    // todo: better schema
    name: z.string().nullable(),
    phone: z.string().nullable(),
    email: z.string().email().nullable(),
    dob: z.string().nullable(),
    country: z.string().nullable(),
  });
  const { name, phone, email, dob, country } = useProfile();
  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      country,
      dob,
      email,
      name,
      phone,
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const functions = useFunctions();
  const updateParentProfileFunction = httpsCallable(
    functions,
    "user-parent-profile-update",
  );

  const onSubmit = handleSubmit((response) => {
    updateParentProfileFunction(response);
  });
  const phoneMask = useMaskito({
    options: {
      mask: [
        "+",
        "1",
        " ",
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],
    },
  });
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined,
  );

  const handleCountryChange = (event: CustomEvent) => {
    // The selected value is available in event.detail.value
    setSelectedCountry(event.detail.value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="settings-pg1-container">
          <IonGrid>
            <IonRow className="ion-justify-content-between row">
              <IonCol size="auto">
                <h1 className="child-profile-heading">
                  <FormattedMessage
                    id="settings.adult"
                    defaultMessage="Adult Profile"
                    description="Adult Profile page title in settings"
                  />
                </h1>
              </IonCol>
            </IonRow>

            <div className="adult-profile-content">
              <Input
                label={intl.formatMessage({
                  id: "settings.fullName",
                  defaultMessage: "Full name",
                  description:
                    "Full name label WITHOUT required asterix in settings",
                })}
                labelPlacement="above"
                name="name"
                fill="outline"
                control={control}
                type="text"
              />

              <br />

              <Input
                label={intl.formatMessage({
                  id: "settings.phone",
                  defaultMessage: "Phone number",
                  description: "Phone number label in settings",
                })}
                labelPlacement="above"
                name="phone"
                fill="outline"
                control={control}
                type="text"
              />

              <br />

              <Input
                label={intl.formatMessage({
                  id: "settings.email",
                  defaultMessage: "Email address",
                  description:
                    "Email address label WITHOUT required asterix in settings",
                })}
                labelPlacement="above"
                name="email"
                fill="outline"
                control={control}
                type="text"
              />

              <br />

              <Input
                label={intl.formatMessage({
                  id: "settings.dob",
                  defaultMessage: "Date of birth",
                  description: "Date of birth input label in settings",
                })}
                labelPlacement="above"
                name="dob"
                fill="outline"
                control={control}
                type="date"
              />

              <br />

              <Input
                label={intl.formatMessage({
                  id: "settings.country",
                  defaultMessage: "Country",
                  description: "Country input label in settings",
                })}
                labelPlacement="above"
                name="country"
                fill="outline"
                control={control}
                type="text"
              />

              <IonRow>
                <IonCol class="col-save-changes-button">
                  <IonButton
                    shape="round"
                    className="save-changes-button"
                    type="submit"
                  >
                    <FormattedMessage
                      id="settings.saveChangeBtn"
                      defaultMessage="Save changes"
                      description="Save changes button label for Adult Profile within settings page"
                    />
                  </IonButton>
                </IonCol>
              </IonRow>
            </div>
          </IonGrid>
        </div>
      </form>
    </>
  );
};
