import { Redirect } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";
import { useInterfaceLanguage } from "@/hooks/InterfaceLanguage";
import { FC, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { I18nWrapper } from "@/components/I18nWrapper";
import { useHistory } from "react-router-dom";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonModal,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { Input } from "@/components/Input";
import { SettingsHeader } from "@/components/Settings/SettingsHeader";
import { DashboardMenu } from "@/components/DashboardMenu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const SettingsLayout: FC<
  React.PropsWithChildren<{
    background?: string;
  }>
> = ({ background = "", children }) => {
  const { language } = useInterfaceLanguage();
  const { profile } = useProfile();
  return (
    <I18nWrapper locale={language}>
      <IonPage>
        <IonContent fullscreen className="ion-padding background-figures">
          <div className="page-wrapper" style={{ background }}>
            <IonGrid className="ion-no-padding inner-scroll">
              <IonRow>
                <IonCol size="2" style={{ minHeight: "100vh" }}>
                  <DashboardMenu />
                </IonCol>
                <IonCol size="10">
                  <div style={{ backgroundColor: "#f7FAF9" }}>
                    <SettingsHeader></SettingsHeader>
                    {children}
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonContent>
      </IonPage>
    </I18nWrapper>
  );
};
