import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonInput,
} from '@ionic/react';
import {
    useSwiper
} from 'swiper/react';
import { FormattedMessage } from 'react-intl';

import {
    useSignUpData
} from '@/pages/SignUp/SignUpContext';

import {useForm} from 'react-hook-form';

import { RadioCard } from '../../components/RadioCard';
import { ExtendedRadioOption, ExtendedRadio } from '@/components/ExtendedRadio';

export const LanguageModeSelect: React.FC = () => {
    const form = useForm<{language: string}>();
    const {data, setData} = useSignUpData();
    const { control, handleSubmit, formState } = form;
    const swiper = useSwiper();

    const spanishOption: ExtendedRadioOption = {
	component: 
		<div>
		    <RadioCard
		    icon={
			<div
			    style={{
				color: '#8B1A00',
				textAlign: 'center',
				fontFamily: 'Outfit',
				fontSize: '24px',
				fontStyle: 'normal',
				fontWeight: '700',
				lineHeight: '120%', 
				letterSpacing: '0.2px',}}
			>
			    EN
			</div>}
		    title='Spanish immersion'
		    content='Choose this setting if you want your child to learn all content 
		    and activities in the Spanish language.'
		    iconBackgroundColor='var(--Habanero-High)'	
		    />
		</div>,
	value: 'spanish',
	
    };
    
    const billingualOption: ExtendedRadioOption = {
	component: 
		<div>
		    <RadioCard
		    icon={
			<div
			    style={{
				color: 'rgba(0, 0, 0, 0.56)',
				textAlign: 'center',
				fontFamily: 'Outfit',
				fontSize: '20px',
				fontStyle: 'normal',
				fontWeight: '700',
				lineHeight: '100%', 
				letterSpacing: '0.2px'
			    }}
			>
			    EN
			    <br/>
			    ES
			</div>}
		    title='Bilingual'
		    content='Choose this setting if you want your child to learn 
		    Spanish with English supports and translations. '
		    iconBackgroundColor='var(--Sol-Low)'
		    />
		</div>,
	value: 'bilingual',
	
    };
    
    const onSubmit = handleSubmit((responses) => { //add logic where to store user's choice
	
	//  setData({ 
	//  	...data,
	// 	...responses
	//  });

        swiper.slideNext();
	
    })

    // TODO: how do we validate it with the form hook?
    const isValid = !!form.watch('language');

    return (
	<>
	    <form onSubmit={onSubmit} className='radio-button-select'>
			<h1>
				<FormattedMessage id="languageMode.settings" defaultMessage="Choose your settings"/>
			</h1>
			<ExtendedRadio
				control = {control}
				name = "language"
				options={[spanishOption, billingualOption]}
			/>
			<IonButton
				data-testid='language-select-continue-button'
				disabled={!isValid}
				shape='round'
				type='submit'>
				<FormattedMessage id="languageMode.continue" defaultMessage="Continue"/>
			</IonButton>
	    </form>
	</>
    );
}
