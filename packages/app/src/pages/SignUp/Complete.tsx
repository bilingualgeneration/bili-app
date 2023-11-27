import { FormattedMessage } from 'react-intl';
import {
    IonButton,
    IonImg,
    IonSpinner,
    IonText
} from "@ionic/react"
import
React,
{
    useEffect,
    useState
} from "react";
import {
    useSignUpData
} from '@/pages/SignUp/SignUpContext';
import {useSwiperSlide} from 'swiper/react';
import {
    createUserWithEmailAndPassword
} from 'firebase/auth';
import {
    useAuth
} from 'reactfire';

/*
   0. display a loading message (need designs)
   1. create account on firebase
   2. log in as that account
   3. send info to firebase function to create the profile
   4. display the complete message
*/

export const Complete: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const swiperSlide = useSwiperSlide();
    const {data} = useSignUpData();
    const auth = useAuth();

    useEffect(async () => {
	if(swiperSlide.isActive){
	    await createUserWithEmailAndPassword(auth, data.email, data.password);
	}
    }, [swiperSlide]);

    if(loading){
	return (
	    <>
		<IonSpinner />
	    </>
	);
    }else{
	
    return (
		<>
			<div 
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
				>
				<IonText className='ion-text-center'>
					<h1>
						<FormattedMessage id="successScreen.success" defaultMessage="Success! You did it!" />
					</h1>
				</IonText>
				
				
				<IonImg src="/assets/img/happy_cactus.png" />
				<IonButton
					shape='round'
					type='submit'
					data-testid='complete-continue-button'
					disabled
					style={{
					opacity: '0.2',
					marginTop: '24px',
					}}
				>
					<FormattedMessage id="successScreen.continue" defaultMessage="Continue" />
				</IonButton>
			</div>

		</>
    );
	}
}
