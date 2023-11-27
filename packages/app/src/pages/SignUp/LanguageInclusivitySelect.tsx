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
import { useIntl, FormattedMessage } from 'react-intl';

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

import NoIcon from '@/assets/icons/no.svg?react';
import SmileyIcon from '@/assets/icons/smiley.svg?react';


export const LanguageInclusivitySelect: React.FC = () => {
	const intl = useIntl();
    const schema = z.object({
	inclusivity: z.string().min(1)//nonempty was deprecated
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
		    title={intl.formatMessage({ id: 'languageInclusivity.excludeGenderNeutralTitle', defaultMessage: 'Exclude gender neutral pronouns', description: 'Title of the exclusive language option description' })}
		    content={intl.formatMessage({ id: 'languageInclusivity.excludeGenderNeutral', defaultMessage: 'Choose this option if you do not want to see the use of gender neutral pronouns in the content (i.e. singular \"they\" in English and \"elle\" in Spanish will be excluded). For example, you will only see the words \"amigo\" and \"amiga\" in activities and content. The word \"amigue\" will not appear.', description: 'Description of the language option that does NOT inlude gender neutral pronouns' })}
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
			badge={intl.formatMessage({ id: 'languageInclusivity.recommended', defaultMessage: 'RECOMMENDED', description: 'Text that sits above the Inclusive language option showing that it is a highly recommended option' })}
		    title={intl.formatMessage({ id: 'languageInclusivity.includeGenderNeutralTitle', defaultMessage: 'Inclusive language', description: 'Title of the inclusive language option description WITH gender neutral pronouns' })}
		    content={intl.formatMessage({ id: 'languageInclusivity.includeGenderNeutral', defaultMessage: 'Choose this option if you want to see the use of gender inclusive language in the content/ For example, the pronouns used will include \"he, she, they\" in English and \"el, ella, elle\" in Spanish.', description: 'Description of the inclusive language option WITH gender neutral pronouns' })}
		    iconBackgroundColor='var(--Flamenco-Highest)'
		    />
		</div>,
	value: 'inclusive'
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
			<form className='radio-button-select'>
				<IonText className='ion-text-center'>
					<h1>
						<FormattedMessage id="languageInclusivity.settings" defaultMessage="Choose your settings" description="The user can choose whether they want language inclusive or not in settings"/>
					</h1>
				</IonText>
				
				<ExtendedRadio
					control={control}
					name='inclusivity'
					options={[nonInclusiveOption, inclusiveOption]}
				/>
				
				<IonButton
					data-testid='language-inclusivity-continue-button'
					disabled={!isValid}
					shape='round'
          onClick={onSubmit}
					type='button'>
					<FormattedMessage id="languageInclusivity.continue" defaultMessage="Continue" description="Continue button after choosing language inclusivity options" />
				</IonButton>
			</form>
		</>
    );
}
