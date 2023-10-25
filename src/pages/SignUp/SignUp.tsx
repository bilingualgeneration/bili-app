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
import {
    useSignUpData,
    SignUpDataProvider
} from '@/pages/SignUp/SignUpContext';

export const SignUp: React.FC = () => {
    const [progressPercent, setProgressPercent] = useState(0);
    const {data} = useSignUpData();
    console.log(data);
    const handleSlideChange = (swiper) => {
	setProgressPercent(
	    swiper.slides[swiper.activeIndex]
		  .getAttribute('data-progress-percent')
	);
    };
    return (
	<>
		<h1>Welcome to Sign Up Page</h1>
		<IonCard>
		    <IonCardContent>
			<IonProgressBar
			value={progressPercent}
			color='primary' />
			<Swiper
			    allowTouchMove={false}
			    onSlideChange={handleSlideChange}>
			    <SwiperSlide
				data-testid='role-select-slide'
				data-progress-percent='0.1'>
				<RoleSelect />
			    </SwiperSlide>
			    <SwiperSlide
				data-testid='account-credentials-slide'
				data-progress-percent='0.2'>
				<AccountCredentials />
			    </SwiperSlide>
			    <SwiperSlide
				data-testid='language-mode-slide'
				data-progress-percent='0.25'>
				<LanguageModeSelect />
			    </SwiperSlide>
			    <SwiperSlide data-testid='language-inclusivity-slide'
					 data-progress-percent='0.5'>
				<LanguageInclusivitySelect />
			    </SwiperSlide>
			    <SwiperSlide
				data-testid='complete-slide'
				data-progress-percent='1'>
				<Complete />
			    </SwiperSlide>
			</Swiper>
		    </IonCardContent>
		</IonCard>
	</>
    )
};
