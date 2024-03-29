import React from "react";
import { FC, JSX } from "react";
import {
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonRadio,
  IonRadioGroup,
  IonList,
} from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";

export const ChildProfile: FC = () => {
  const intl = useIntl();
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
          <IonRadio mode="md"  labelPlacement="end">
	    <IonText>
	      <p className='text-xl color-suelo'>
            <FormattedMessage
              id="childProfile.age.lessThan3"
              defaultMessage="Below 3 years old"
              description="Age Range for below 3 years old"
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
          <IonRadio mode="md"  labelPlacement="end">
	    <IonText>
	      <p className='text-xl color-suelo'>
            <FormattedMessage
              id="childProfile.age.3to5"
              defaultMessage="3-5 years old"
              description="Age Range for 3-5 years old"
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
          <IonRadio mode="md"  labelPlacement="end">
	    <IonText>
	      <p className='text-xl color-suelo'>
		<FormattedMessage
		  id="childProfile.age.5to7"
		  defaultMessage="5-7 years old"
		  description="Age Range for 5-7 years old"
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
          <IonRadio mode="md"  labelPlacement="end">
	    <IonText>
	      <p className='text-xl color-suelo'>
            <FormattedMessage
              id="childProfile.age.above7"
              defaultMessage="Above 7 years old"
              description="Age Range for above 7 years old"
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
            <h2 className='text-3xl semibold color-suelo'>
              <FormattedMessage
                id="childProfile.title"
                defaultMessage="Make a profile for your child"
                description="Title for page where parents share information about their child"
              />
            </h2>
            <p className='text-xl color-suelo'>
              <FormattedMessage
                id="childProfile.subtitle"
                defaultMessage="This helps us personalize your child's learning experience. You
                can add more profiles in settings."
                description="Text at bottom of page that comes before the 'Sign up' link prompting users to sign up using the link if they don't have an account"
              />
            </p>
          </IonText>
        </div>
        <br />
        <div>
          <IonText>
            <p className='text-xl color-suelo'>
              <FormattedMessage
                id="childProfile.nameLabel"
                defaultMessage="Enter your child's name or nickname:"
                description="Label for text input where parents can enter their child's name"
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
            <p className='text-xl color-suelo'>
              <FormattedMessage
                id="childProfile.ageLabel"
                defaultMessage="Select your child's age range:"
                description="Label for radio input where parents can select their child's age range"
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
          <FormattedMessage
            id="common.continue"
            defaultMessage="Continue"
            description="Button label to continue"
          />
        </IonButton>
      </form>
    </>
  );
};
