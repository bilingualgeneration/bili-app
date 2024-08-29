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

export const AddClassroomLanguage: React.FC = () => {
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

    const englishOption: ExtendedRadioOption = {
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
                    title={intl.formatMessage({
                        id: "languageMode.engImmersionTitle",
                        defaultMessage: "English Immersion",
                    })}
                    content={intl.formatMessage({
                        id: "languageMode.engImmersion",
                        defaultMessage:
                            "Choose this setting if you want your child to learn all content and activities in the English language.",
                    })}
                    iconBackgroundColor="#0045A1"
                />
            </div>
        ),
        value: 'en',
    };

    const spanishOption: ExtendedRadioOption = {
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
                    title={intl.formatMessage({
                        id: "languageMode.immersionTitle",
                        defaultMessage: "Spanish Immersion",
                        description: "Title of the Spanish immersion mode option",
                    })}
                    content={intl.formatMessage({
                        id: "languageMode.immersion",
                        defaultMessage:
                            "Choose this setting if you want your child to learn all content and activities in the Spanish language.",
                        description: "Description of the Spanish immersion option",
                    })}
                    iconBackgroundColor="#F0091B"
                />
            </div>
        ),
        value: 'es',
    };

    const billingualOption: ExtendedRadioOption = {
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
                    title={intl.formatMessage({
                        id: "languageMode.bilingualTitle",
                        defaultMessage: "Bilingual",
                        description: "Title of the Bilingual mode option",
                    })}
                    content={intl.formatMessage({
                        id: "languageMode.bilingual",
                        defaultMessage:
                            "Choose this setting if you want your child to learn Spanish with English supports and translations.",
                        description: "Description of the Bilingual mode option",
                    })}
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

        history.push('/classrooms/add_students');
    });

    return (

        <div className="">
            <IonCard style={{ maxWidth: 580, margin: "auto", marginTop: "24px", }}>
                <form className="radio-button-select">
                    <IonText className="ion-text-center">
                        <h3 className="text-3xl semibold color-suelo">
                            Classroom language settings
                        </h3>
                        <p className="text-lg color-barro">
                        * You can always change this later
                        </p>
                    </IonText>
                    <ExtendedRadio
                        control={control}
                        name="isImmersive"
                        options={[billingualOption, spanishOption, englishOption]}
                    />

                    <IonItem lines="none">
                        <Popover
                            content={"???"}
                            trigger="click-trigger1"
                        />
                        <Question 
                            id="click-trigger1" 
                            style={{marginRight: "16px",}}
                        />
                        <IonToggle
                            justify="space-between"
                            onClick={() => {
                                
                            }}
                            //checked={}
                            mode="ios"
                        >
                            <div className="label-style">
                                <IonText>
                                    <p className="text-2xl semibold">
                                    Language Toggle
                                    </p>
                                </IonText>
                            </div>
                        </IonToggle>
                    </IonItem>

                    <IonItem lines="none">
                        <Popover
                            content={
                                    "Choose inclusive Spanish to opt for terms like 'amigues,' 'niñes,' and 'Latine' to personalize your experience when referring to groups or non-binary characters. Disable this feature if you do not want to see these terms."}
                            trigger="click-trigger2"
                        />
                        <Question 
                            id="click-trigger2" 
                            style={{marginRight: "16px",}}
                        />
                        <IonToggle
                            justify="space-between"
                            onClick={() => {
                                updateProfile("isInclusive", !isInclusive);
                            }}
                            checked={isInclusive}
                            mode="ios"
                        >
                            <div className="label-style">
                                <IonText>
                                    <p className="text-2xl semibold">
                                    Inclusive Spanish
                                    </p>
                                </IonText> 
                            </div>
                        </IonToggle>
                    </IonItem>

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
