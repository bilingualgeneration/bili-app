import { Redirect } from "react-router-dom";
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
import { useLanguageToggle } from "@/components/LanguageToggle";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const SettingsLayout: FC<
  React.PropsWithChildren<{
    background?: string;
  }>
> = ({ background = "", children }) => {
  const { setIsVisible, setTempLanguage } = useLanguageToggle();
  useEffect(() => {
    setIsVisible(false);
    setTempLanguage("en");
    return () => {
      setIsVisible(true);
      setTempLanguage(null);
    };
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen={true} className="ion-padding background-figures">
        <div
          className="page-wrapper"
          style={{ backgroundColor: "#f7faf9", paddingBottom: 0 }}
        >
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
  );
};
