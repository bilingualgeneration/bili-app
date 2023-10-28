import { ExtendedRadio, ExtendedRadioOption } from '@/components/ExtendedRadio';

import {
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
} from '@ionic/react';

import {
    useSwiper
} from 'swiper/react';
import {
    useSignUpData
} from '@/pages/SignUp/SignUpContext';

import {useForm, FormProvider} from 'react-hook-form';

import HouseIcon from '@/assets/icons/house.svg?react';
import SchoolIcon from '@/assets/icons/school.svg?react';

import "./RoleSelect.css";
import { string } from 'zod';
import { CollectionReference } from 'firebase/firestore';
import { RadioCard } from '../../components/RadioCard';

export const RoleSelect: React.FC = () => {
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
			title='Parent/Caregiver'
			content='I want to use this app with my child(ren)'
			icon={<HouseIcon/>}
			iconBackgroundColor='var(--Desierto-Highest)'
	    />
	</div>,
	value: 'parent',
	
    };

    const onSubmit = handleSubmit((responses) => { //add logic where to store user's choice
		/* commented it out becuse setData() gives an error 
		and doesn't allow to slide to the next slide
		 setData({ 
		 	...data,
			...responses
		 });*/
        swiper.slideNext();
		
    })

    // TODO: how do we validate it with the form hook?
    const isValid = !!form.watch('role');
    
    return (
	<>
	    <form onSubmit={onSubmit} className='role-select'>
			<h1>
				Which best describes you?
			</h1>
			<ExtendedRadio
			control = {control}
			name = "role"
			options={[teacherOption, parentOption]}
			/>
			<IonButton
				type='submit'
				data-testid='role-select-continue-button'
				disabled={!isValid}
			>
				Continue
			</IonButton>
	    </form>
	    
	</>
    );
}
