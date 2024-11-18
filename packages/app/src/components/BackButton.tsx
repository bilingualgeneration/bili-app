import backButton from "@/assets/icons/back_button_arrow.svg";
import { IonButton, IonIcon } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useScreenSize } from "@/lib/screenSize";

export const BackButton: React.FC = () => {
  const history = useHistory();
  const { screenType } = useScreenSize();
  return (
    <>
      <IonButton
        className="flamenco-high curved-corners"
        size={screenType === "mobile" ? "small" : "large"}
        onClick={history.goBack}
      >
        <IonIcon slot="icon-only" icon={backButton} />
      </IonButton>
    </>
  );
};
