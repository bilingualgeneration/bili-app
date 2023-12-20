import React, { Children } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { volumeMedium } from "ionicons/icons";
import { FormattedMessage } from "react-intl";
import "./VolumeCard.css";

// EVERYTHING THAT IS COMMENTED OUT CAN BE READDED ONCE USER PROFILE IS COMPLETE AND
// OTHER CODE CAN BE REMOVED

interface VolumeCardProps {
  // isSpanishBilingual?: boolean;
  children?: React.ReactNode;
  iconClass?: string;
}

export const VolumeCard: React.FC<VolumeCardProps> = ({
  /* isSpanishBilingual = false,*/ children,
  iconClass,
}) => {
  // const volumeIconContainerClass = isSpanishBilingual
  //   ? 'volume-icon-container-greyed-out'
  //   : 'volume-icon-container';

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol class="ion-text-center">
            <div className={`volume-icon-container ${iconClass}`}>
              <IonIcon icon={volumeMedium} className="volume-icon" />
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>

    //  <IonCard className="mini-fabrica-card">
    //   <IonCardContent>
    //     <IonGrid>
    //       <IonRow className="ion-justify-content-center">
    //         <IonCol className="ion-text-center">
    //           <div className={volumeIconContainerClass}>
    //             <IonIcon icon={volumeMedium} className="volume-icon" />
    //           </div>
    //         </IonCol>
    //       </IonRow>

    //       <IonRow>
    //         <IonCol className="ion-text-center">
    //           {isSpanishBilingual ? (
    //             <>
    //               {/* Spanish text that comes from React-intl goes here */}
    //               <IonText>
    //                 <FormattedMessage id="yourSpanishMessageId" defaultMessage="Your Spanish Text" />
    //               </IonText>
    //             </>
    //           ) : (
    //             // Single row for English text
    //             <IonText>{children}</IonText>
    //           )}
    //         </IonCol>
    //       </IonRow>

    //       {/* Additional row for second line of English text if isSpanishBilingual is true */}
    //       {isSpanishBilingual && (
    //         <IonRow>
    //           <IonCol className="ion-text-center">
    //             <IonText>Your second line of English text</IonText>
    //           </IonCol>
    //         </IonRow>
    //       )}
    //     </IonGrid>
    //   </IonCardContent>
    // </IonCard>
  );
};
