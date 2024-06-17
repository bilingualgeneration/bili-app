import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";

import { IonButton, IonLabel, IonItem, IonInput, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";

import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import HouseIcon from "@/assets/icons/house.svg?react";
import { useEffect, useState } from "react";


import "./ClassCode.scss";


export const ClassCode: React.FC = () => {
    const intl = useIntl();
    const schema = z.object({
        role: z.string().min(1), //nonempty was deprecated
    });
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<z.infer<typeof schema>>({
        mode: "onBlur",
        // resolver: zodResolver(schema),
    });
    const { data, setData, pushPage } = useSignUpData();
    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const correctCode = ['1', '2', '3', '4']

    useEffect(() => {
        // Check if the input code matches the correct code
        const codeMatches = code.join('') === correctCode.join('');
        setIsButtonEnabled(codeMatches);
    }, [code]);

    const onSubmit = handleSubmit((responses) => {
       
        setData({
            ...data,
            ...responses,
        });
        // @ts-ignore todo: better typing
        pushPage("parentAccountCredentials");
    });

    const handleChange = (value: string, index: number) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    };

    return (
        <>
            <form className="">
                <IonCard 
                    id="class-code-styles" 
                    style={{ cursor: "pointer", paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                    <div className="">
                        <div className="">
                            {/* <div
                                className=""
                                style={{
                                    backgroundColor: "var(--Flamenco-High)",
                                    marginLeft: "18px",
                                    paddingLeft: "8px",
                                    paddingRight: "8px",
                                    borderRadius: "4px",
                                }}
                            >
                            </div> */}
                            <IonCardHeader class="custom-ion-header margin-bottom-3">
                                <IonCardTitle>
                                    <IonText className="ion-text-center">
                                        {/* todo: don't force type cast */}
                                        <h2 className="text-3xl semibold color-suelo">
                                            <FormattedMessage
                                                id="signUp.classCode"
                                                defaultMessage="What’s your class code?"
                                                description="Title of page where user is presented with button options where they can choose if they are a teacher or parent/caregiver."
                                            />
                                        </h2>
                                        <p
                                            className="text-lg"
                                            style={{ marginTop: "12px" }}
                                        >
                                            Don’t know your class code? Ask a teacher
                                        </p>
                                    </IonText>
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="digit-wrapper">

                                    {code.map((digit, index) => (
                                        <div className="digit-window" key={index}>
                                            <IonItem
                                                lines="none"
                                            >
                                                <IonInput
                                                    value={digit}
                                                    maxlength={1}
                                                    fill="solid"
                                                    aria-label="code-number"
                                                    className="custom-input-style"
                                                    
                                                    onIonInput={(e: any) => handleChange(e.target.value, index)}
                                                />
                                            </IonItem>


                                        </div>
                                    ))}

                                </div>
                            </IonCardContent>
                        </div>
                    </div>
                </IonCard>

                <IonButton
                    className="margin-vertical-3"
                    shape="round"
                    expand="block"
                    type="button"
                    onClick={(e) => {
                        onSubmit(e)
                    }}
                    data-testid="role-select-continue-button"
                    disabled={!isButtonEnabled}
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
