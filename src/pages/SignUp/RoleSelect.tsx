import {
    ExtendedRadio,
    ExtendedRadioOption
} from '@/components/ExtendedRadio';

import {
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
} from '@ionic/react';
import {
    useIntl,
    FormattedMessage
} from 'react-intl';

import {
    useSwiper
} from 'swiper/react';
import {
    useSignUpData
} from '@/pages/SignUp/SignUpContext';

import {useForm} from 'react-hook-form';

// @ts-ignore todo: cannot find module or its corresponding type declarations
import HouseIcon from '@/assets/icons/house.svg?react';
// @ts-ignore todo: cannot find module or its corresponding type declarations
import SchoolIcon from '@/assets/icons/school.svg?react';

import "./RoleSelect.css";
import { string } from 'zod';
import { CollectionReference } from 'firebase/firestore';
import { RadioCard } from '@/components/RadioCard';

export const RoleSelect: React.FC = () => {
    const intl = useIntl();
    console.log(intl);
    const form = useForm<{role: string}>();
    const {data, setData} = useSignUpData();
    const { control, handleSubmit, formState } = form;
    
    const swiper = useSwiper();
    const teacherOption: ExtendedRadioOption = {
		component: 
			<div>
				<RadioCard
					title='Teacher'
					content='I want to use this app with my students'
					icon={<SchoolIcon/>}
					iconBackgroundColor='var(--Cielo-Cielo)'	
				/>
			</div>,
		value: 'teacher',
    };

    const parentOption: ExtendedRadioOption = {
	component: 
	<div>
	    <RadioCard
		title={intl.messages['signUp.parent']}
		content={intl.messages['signUp.parent2']}
		icon={<HouseIcon/>}
		iconBackgroundColor='var(--Desierto-Highest)'
	    />
	</div>,
	value: 'parent',
	
    };

    const onSubmit = handleSubmit((responses) => { //add logic where to store user's choice
	//  setData({ 
	//  	...data,
	// 	...responses
	//  });
        swiper.slideNext();
	
    })

    // TODO: how do we validate it with the form hook?
    const isValid = !!form.watch('role');
    
    return (
	<>
	    <form onSubmit={onSubmit} className='radio-button-select'>
			<h1>
				<FormattedMessage id="signUp.describe" defaultMessage="Which best describes you?" />
			</h1>
			<ExtendedRadio
				control = {control}
				name = "role"
				options={[teacherOption, parentOption]}
			/>
			<IonButton
				shape='round'
				type='submit'
				data-testid='role-select-continue-button'
				disabled={!isValid}>
				<FormattedMessage id="signUp.continue" defaultMessage="Continue" /> 
			</IonButton>
	    </form>
	    
	</>
    );
}
