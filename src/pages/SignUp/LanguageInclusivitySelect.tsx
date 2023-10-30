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
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {
    useSignUpData
} from '@/pages/SignUp/SignUpContext';

import {useForm} from 'react-hook-form';

import { RadioCard } from '@/components/RadioCard';
import { ExtendedRadioOption, ExtendedRadio } from '@/components/ExtendedRadio';

// @ts-ignore todo: cannot find module or its corresponding type declarations
import NoIcon from '@/assets/icons/no.svg?react';
// @ts-ignore todo: cannot find module or its corresponding type declarations
import SmileyIcon from '@/assets/icons/smiley.svg?react';


export const LanguageInclusivitySelect: React.FC = () => {
    const schema = z.object({
	inclusivity: z.string().nonempty()
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
    const nonInclusiveOption: ExtendedRadioOption = {
	component: 
		<div>
		    <RadioCard
		    icon={<NoIcon />}
		    title='Exclude'
		    content='Lorem Ipsum'
		    iconBackgroundColor='var(--Arena-High)'	
		    />
		</div>,
	value: 'noninclusive'
    };
    
    const inclusiveOption: ExtendedRadioOption = {
	component: 
		<div>
		    <RadioCard
		    icon={<SmileyIcon />}
		    title='Inclusive language'
		    content='lorem ipsum'
		    iconBackgroundColor='var(--Flamenco-Highest)'
		    />
		</div>,
	value: 'inclusive'
    };
    
    const onSubmit = handleSubmit((responses) => { //add logic where to store user's choice
	
	//  setData({ 
	//  	...data,
	// 	...responses
	//  });

        swiper.slideNext();
    })

    return (
	<>
	    <form onSubmit={onSubmit} className='radio-button-select'>
		<h1>
		    Choose your settings
		</h1>
		<ExtendedRadio
		control={control}
		name='inclusivity'
		options={[nonInclusiveOption, inclusiveOption]}
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
