import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonInput,
    IonText,
    IonToggle,
} from "@ionic/react";
import Question from "@/assets/icons/question.svg?react";
import { useIntl, FormattedMessage } from "react-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { useForm } from "react-hook-form";
import { RadioCard } from "../../components/RadioCard";
import { ExtendedRadioOption, ExtendedRadio } from "@/components/ExtendedRadio";
import { Popover } from "@/components/Popover";
import { useProfile } from "@/hooks/Profile";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/components/Firebase";
import { useHistory } from "react-router";

export const InviteCaregivers: React.FC = () => {
    const intl = useIntl();
    const schema = z.object({
        isImmersive: z.enum(['en', 'es', 'esen']),
    });
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<z.infer<typeof schema>>({
        mode: "onBlur",
        resolver: zodResolver(schema),
    });
    const { data, setData, pushPage } = useSignUpData();
    const history = useHistory();
    const { user: {uid}, profile: {isImmersive, isInclusive, settingsLanguage }} = useProfile();
    const ref = doc(firestore, "users", uid);
  // TODO: we shouldn't allow this straight from the app
    const updateProfile = (key: string, value: any) => {
        updateDoc(ref, {
        [key]: value,
        });
    };

    const emailOption: ExtendedRadioOption = {
        component: (
            <div>
                <RadioCard
                    icon={
                        <div
                            style={{
                                color: "#FFFFFF",
                                textAlign: "center",
                                fontFamily: "Outfit",
                                fontSize: "24px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "120%",
                                letterSpacing: "0.2px",
                            }}
                        >
                            ES
                        </div>
                    }
                    title={'By email'}
                    content={'I want to email student caregivers with instructions to sign up'}
                    iconBackgroundColor="#0045A1"
                />
            </div>
        ),
        value: 'en',
    };

    const emailAndFlyerOption: ExtendedRadioOption = {
        component: (
            <div>
                <RadioCard
                    icon={
                        <div
                            style={{
                                color: "#FFFFFF",
                                textAlign: "center",
                                fontFamily: "Outfit",
                                fontSize: "24px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "120%",
                                letterSpacing: "0.2px",
                            }}
                        >
                            ES
                        </div>
                    }
                    title={'Both email and flyer'}
                    content={'I want to email student caregivers and send students home with print out instructions for their caregivers to sign up'}
                    iconBackgroundColor="#F0091B"
                />
            </div>
        ),
        value: 'es',
    };

    const flyerOption: ExtendedRadioOption = {
        component: (
            <div>
                <RadioCard
                    icon={
                        <div
                            style={{
                                color: "#FFFFFF",
                                textAlign: "center",
                                fontFamily: "Outfit",
                                fontSize: "20px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "100%",
                                letterSpacing: "0.2px",
                            }}
                        >
                            EN
                            <br />
                            ES
                        </div>
                    }
                    title={'By print out flyer'}
                    content={'I want to send students home with print out instructions for their caregivers to sign up'}
                    iconBackgroundColor="#006A67"
                />
            </div>
        ),
        value: 'esen',
    };

    const onSubmit = handleSubmit((responses) => {

        setData({
            ...data,
            ...responses,
        });

        history.push('/classrooms');
    });

    return (

        <div className="">
            <IonCard style={{ maxWidth: 580, margin: "auto", marginTop: "24px", }}>
                <form className="radio-button-select">
                    <IonText className="ion-text-center">
                        <h3 className="text-3xl semibold color-suelo">
                            You’ve created your class!
                        </h3>
                        <p className="text-xl semibold color-suelo">
                            Invite student caregivers to download the app
                        </p>
                    </IonText>
                    <ExtendedRadio
                        control={control}
                        name="isImmersive"
                        options={[emailOption, flyerOption, emailAndFlyerOption]}
                    />

                    <IonButton
                        data-testid="language-select-continue-button"
                        disabled={!isValid}
                        shape="round"
                        type="button"
                        onClick={onSubmit}
                    >
                        <FormattedMessage
                            id="common.continue"
                            defaultMessage="Continue"
                            description="Button label to continue"
                        />
                    </IonButton>
                </form>
            </IonCard>
        </div>
    );
};
