import backButton from '@/assets/icons/back_button_orange.svg';
import {
  IonButton,
  IonIcon,
} from '@ionic/react';
import {useHistory} from 'react-router-dom';


export const BackButton: React.FC = () => {
  const history = useHistory();
  return <>
    <IonButton
      fill='clear'
      id='back_button'
      onClick={history.goBack}
    >
      <IonIcon slot='icon-only' icon={backButton} />
    </IonButton>
  </>
}
