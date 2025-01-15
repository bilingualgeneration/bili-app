import { FormattedMessage, useIntl } from "react-intl";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { Input } from "@/components/Input";
import { useMaskito } from "@maskito/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "@/hooks/Profile";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./Profile.scss";
import {
  MultipleCheckbox,
  MultipleCheckboxOption,
} from "@/components/MultipleCheckbox";

const OptionWrapper = ({ children }: { children: JSX.Element }) => {
  return <IonCol size="3">{children}</IonCol>;
};

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
  const {
    profile: { name, phone, email, dob, country },
  } = useProfile();
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
  const functions = getFunctions();
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

  const gradesOptions: MultipleCheckboxOption[] = [
    {
      label: "Below 3 years old",
      value: "below",
    },
    {
      label: "3-5 years old",
      value: "3-5",
    },
    {
      label: "5-7 years old",
      value: "5-7",
    },
    {
      label: "Above 7 years old",
      value: "above",
    },
  ];

  return (
    <>
      <form action="">
        <IonItem>
          <IonLabel>
            <h1 className="font-3xl semibold color-suelo">Add a Child</h1>
          </IonLabel>
        </IonItem>

        <div className="adult-profile-content">
          <Input
            label="First name or nickname"
            labelPlacement="above"
            //required={true}
            name="name"
            fill="outline"
            control={control}
            testId="child-name-input"
            type="text"
            className="child-name-input"
          />

          <div className="margin-bottom-1 margin-top-2">
            <IonText>
              <h2 className="text-md semibold color-barro">Age Range</h2>
            </IonText>
          </div>
          <div className="text-md color-suelo grades-styles">
            <IonGrid>
              <IonRow>
                <MultipleCheckbox
                  control={control}
                  labelPlacement="end"
                  options={gradesOptions}
                  name="grades"
                  wrapper={OptionWrapper}
                />
              </IonRow>
            </IonGrid>
          </div>

          <div className="save-name-block">
            <IonButton
              className="margin-top-2 elevate save-changes-button"
              expand="block"
              shape="round"
              type="button"
              data-testid="teacher-about-continue-button"
              // disabled={!isValid}
              onClick={onSubmit}
            >
              <FormattedMessage id="common.continue" />
            </IonButton>
          </div>
        </div>
      </form>
      <form onSubmit={onSubmit}>
        <div className="settings-pg1-container">
          <IonGrid>
            <IonRow className="">
              <IonCol size="">
                <IonItem>
                  <IonLabel>
                    <h1 className="font-3xl semibold color-suelo">
                      <FormattedMessage
                        id="settings.adult"
                        defaultMessage="Adult Profile"
                        description="Adult Profile page title in settings"
                      />
                    </h1>
                  </IonLabel>
                </IonItem>
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
