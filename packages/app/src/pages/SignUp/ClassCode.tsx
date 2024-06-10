import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";

import { IonButton, IonLabel, IonItem, IonInput, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";

import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import HouseIcon from "@/assets/icons/house.svg?react";
import { useState } from "react";


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
        resolver: zodResolver(schema),
    });
    const { data, setData, pushPage } = useSignUpData();
    const [code, setCode] = useState<string[]>(['', '', '', '']);


    const onSubmit = handleSubmit((responses) => {
        //add logic where to store user's choice
        setData({
            ...data,
            ...responses,
        });
        // @ts-ignore todo: better typing

    });

    return (
        <>
            <form onSubmit={onSubmit} className="">
                

                <IonCard id="class-code-styles" style={{ cursor: "pointer", paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                    <div className="">
                        <div className="">
                            <div
                                className=""
                                style={{
                                    backgroundColor: "var(--Flamenco-High)",
                                    marginLeft: "18px",
                                    paddingLeft: "8px",
                                    paddingRight: "8px",
                                    borderRadius: "4px",
                                }}
                            >

                            </div>
                            <IonCardHeader class="custom-ion-header">
                                <IonCardTitle>
                                    <IonText>
                                        {/* todo: don't force type cast */}
                                        <h2 className="text-3xl semibold color-suelo">
                                            <FormattedMessage
                                                id="signUp.classCode"
                                                defaultMessage="What’s your class code?"
                                                description="Title of page where user is presented with button options where they can choose if they are a teacher or parent/caregiver."
                                            />
                                        </h2>
                                        <p className="text-2xl semibold color-selva">
                                            Don’t know your class code? Ask a teacher
                                        </p>
                                    </IonText>
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <div>
                                    <IonGrid>
                                        <IonRow>
                                        {code.map((digit, index) => (
                                            <IonCol size="1" key={index}>
                                                <IonItem>
                                                    <IonInput
                                                        value={digit}
                                                        type="number"
                                                        maxlength={1}
                                                        fill="solid"
                                                        aria-label="code-number"
                                                        className="custom-input-style"
                                                        //onIonInput={(e: any) => handleChange(e.target.value, index)}
                                                    />
                                                </IonItem>
                                                
                                                
                                            </IonCol>
                                        ))}
                                        </IonRow>
                                    </IonGrid>
                                </div>
                            </IonCardContent>
                        </div>
                    </div>
                </IonCard>

                <IonButton
                    className="margin-vertical-1"
                    shape="round"
                    type="button"
                    onClick={onSubmit}
                    data-testid="role-select-continue-button"
                    disabled={!isValid}
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
