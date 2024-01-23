import { FormattedMessage, useIntl } from "react-intl";
import { IonItem, IonList, IonText } from "@ionic/react";

import "./About.scss";

interface link {
  text: string;
  url: string;
}

export const About: React.FC = () => {
  const intl = useIntl();
  const links: link[] = [
    {
      text: intl.formatMessage({
        id: "settings.about.tac",
        defaultMessage: "Terms & Conditions",
        description: "Link text for terms and conditions",
      }),
      url: "https://bilingualgeneration.com/bili/",
    },
    {
      text: intl.formatMessage({
        id: "settings.about.privacyPolicy",
        defaultMessage: "Privacy Policy",
        description: "Link text for privacy policy",
      }),
      url: "https://bilingualgeneration.com/bili/",
    },
    {
      text: intl.formatMessage({
        id: "settings.about.contactUs",
        defaultMessage: "Contact Us",
        description: "Link text for contact us",
      }),
      url: "https://bilingualgeneration.com/bili/",
    },
  ];
  return (
    <IonList id="SettingsAboutPage">
      <IonItem>
        <IonText>
          <h1 className="color-suelo">
            <FormattedMessage
              id="settings.about.title"
              defaultMessage="About"
              description="Title for about page"
            />
          </h1>
        </IonText>
      </IonItem>

      {/* todo: need a new link when going to app */}
      {links.map((link, index) => (
        <IonItem key={index} href={link.url} target="_blank">
          <IonText>
            <h3 className="color-selva">{link.text}</h3>
          </IonText>
        </IonItem>
      ))}
    </IonList>
  );
};
