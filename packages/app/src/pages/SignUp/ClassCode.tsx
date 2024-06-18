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
        formState: { isValid },
        watch

    } = useForm<z.infer<typeof schema>>({
        mode: "onChange",
        resolver: zodResolver(schema),
    });
    const { data, setData, pushPage } = useSignUpData();

    const onSubmit = handleSubmit((responses) => {
       
        setData({
            ...data,
            ...responses,
        });
        // @ts-ignore todo: better typing
        pushPage("parentAccountCredentials");
    });
    const inputs = ['code0', 'code1', 'code2', 'code3']

    const values = watch()
    console.log(values)
    const isValidCode = 
        values.code0 === '1' && 
        values.code1 === '2' && 
        values.code2 === '3' && 
        values.code3 === '4'

    return (
        <>
            <form className="">
                <IonCard 
                    id="class-code-styles" 
                    style={{ cursor: "pointer", paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
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
                                        <p
                                            className="text-lg"
                                            style={{ marginTop: "12px" }}
                                        >
                                            <FormattedMessage
                                                id="signUpParent.classCodeAsk"
                                                defaultMessage="Don’t know your class code? Ask a teacher"
                                                
                                            />
                                            
                                        </p>
                                    </IonText>
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="digit-wrapper">

                                    {inputs.map((name) => (
                                        <div className="digit-window" key={name}>
                                           
                                                <Input
                                                className="custom-input-style"
                                                control = {control}
                                                fill = "outline"
                                                labelPlacement = "floating"
                                                name = {name}
                                                required={true}
                                                />
                                           
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
                    onClick={onSubmit}
                    data-testid="role-select-continue-button"
                    disabled={!isValidCode}
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
