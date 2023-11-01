import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonInput,
    IonText,
} from '@ionic/react';
import {
    useSwiper
} from 'swiper/react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    useSignUpData
} from '@/pages/SignUp/SignUpContext';

import {useForm} from 'react-hook-form';

import { RadioCard } from '../../components/RadioCard';
import { ExtendedRadioOption, ExtendedRadio } from '@/components/ExtendedRadio';

export const LanguageModeSelect: React.FC = () => {
	const schema = z.object({
		language: z.string().min(1)//nonempty was deprecated
		});
		const {
		control,
		handleSubmit,
		formState: {isValid}
		} = useForm<z.infer<typeof schema>>({
		mode: 'onChange',
		resolver: zodResolver(schema)
		});
    const {data, setData} = useSignUpData();
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
	
	 setData({ 
	 	...data,
		...responses
	 });

        swiper.slideNext();
	
    })

    return (
	<>
	    <form onSubmit={onSubmit} className='radio-button-select'>
		<IonText className='ion-text-center'>
		    <h1>
			Choose your settings
		    </h1>
		</IonText>
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
		    Continue
		</IonButton>
	    </form>
	</>
    );
}
