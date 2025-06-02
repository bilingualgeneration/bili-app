// TODO: standardize size and style

import { IonSpinner } from "@ionic/react";

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="ion-text-center" style={{ width: "100%", height: "100%" }}>
      <IonSpinner name="circular" />
    </div>
  );
};
