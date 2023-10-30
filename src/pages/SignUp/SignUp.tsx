import {
    IonCard,
    IonCardContent,
    IonProgressBar,
} from '@ionic/react';
import React, {
    useState
} from 'react';
import {
    AccountCredentials,
    Complete,
    RoleSelect,
    LanguageInclusivitySelect,
    LanguageModeSelect,
} from '@/pages/SignUp';
import {
    Swiper,
    SwiperSlide
} from 'swiper/react';
import SwiperCore from 'swiper';
import {
    useSignUpData,
    SignUpDataProvider
} from '@/pages/SignUp/SignUpContext';

export const SignUp: React.FC = () => {
    const [progressPercent, setProgressPercent] = useState<number>(0.2);
    const {data} = useSignUpData();
    const handleSlideChange = (swiper: SwiperCore): void => {
	setProgressPercent(
	    Number(
		swiper.slides[swiper.activeIndex]
		      .getAttribute('data-progress-percent')!
	    )
	);
    };
    return (
	<>
		<IonCard>
		    <IonCardContent>
			<div className='ion-padding'>
			    <IonProgressBar
				color='primary'
				style={{width: '60%', margin: 'auto'}}
				value={progressPercent}
			    />
			</div>
			<Swiper
			    allowTouchMove={false}
			    onSlideChange={handleSlideChange}>
			    <SwiperSlide
				className='ion-padding-top'
				data-testid='role-select-slide'
				data-progress-percent={0.2}>
				<RoleSelect />
			    </SwiperSlide>
			    <SwiperSlide
				className='ion-padding-top'
				data-testid='account-credentials-slide'
				data-progress-percent={0.4}>
				<AccountCredentials />
			    </SwiperSlide>
			    <SwiperSlide
				className='ion-padding-top'
				data-testid='language-mode-slide'
				data-progress-percent={0.6}>
				<LanguageModeSelect />
			    </SwiperSlide>
			    <SwiperSlide
				className='ion-padding-top'
				data-testid='language-inclusivity-slide'
				data-progress-percent={0.8}>
				<LanguageInclusivitySelect />
			    </SwiperSlide>
			    <SwiperSlide
				className='ion-padding-top'
				data-testid='complete-slide'
				data-progress-percent={1}>
				<Complete />
			    </SwiperSlide>
			</Swiper>
		    </IonCardContent>
		</IonCard>
	</>
    )
};
