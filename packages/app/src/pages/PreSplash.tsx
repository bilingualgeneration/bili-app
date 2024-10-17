import Logo from "@/assets/icons/bili_logo.svg?react";
import { IonButton, IonContent, IonImg, IonText, IonPage } from "@ionic/react";
import "./PreSplash.css";
import Bili from "@/assets/icons/bili_big_avatar.svg?react";
import { FormattedMessage } from "react-intl";
import { useInterfaceLanguage } from "@/hooks/InterfaceLanguage";
import { I18nWrapper } from "@/components/I18nWrapper";

export const PreSplash: React.FC = () => {
  const { language } = useInterfaceLanguage();
  return (
    <IonPage>
      <IonContent>
        <I18nWrapper locale={language}>
          <div id="start-page">
            <div className="page-wrapper" style={{ paddingBottom: 0 }}>
              <div
                id="inner-start-page"
                style={{ paddingTop: "3rem", paddingBottom: "2rem" }}
              >
                <Logo />
                <IonText>
                  <p
                    className="text-2xl color-nube semibold"
                    style={{ marginTop: "0.5rem" }}
                  >
                    <FormattedMessage
                      id="presplash.tagline"
                      defaultMessage="Language learning that is abuelita and science–approved"
                    />
                  </p>
                </IonText>
                <Bili style={{ margin: "3rem 0" }} />
                <IonText>
                  <p className="text-lg color-cielo-highest semibold">
                    <FormattedMessage
                      id="presplash.tryit"
                      defaultMessage="Try it all for FREE"
                    />
                  </p>
                </IonText>
                <div style={{ width: 400 }}>
                  <IonButton
                    className="margin-top-2 margin-bottom-1"
                    routerLink="/splash"
                    expand="full"
                    shape="round"
                  >
                    <FormattedMessage
                      id="presplash.getStarted"
                      defaultMessage="Let's get started"
                    />
                  </IonButton>
                </div>
                <IonText>
                  <p className="text-sm color-cielo-highest">
                    <FormattedMessage
                      id="presplash.noCommitments"
                      defaultMessage="No commitments, cancel anytime."
                    />
                  </p>
                </IonText>
              </div>
            </div>
          </div>
        </I18nWrapper>
      </IonContent>
    </IonPage>
  );
};
