import { ExtendedRadio, ExtendedRadioOption } from '@/components/ExtendedRadio';

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
import {
    useSignUpData
} from '@/pages/SignUp/SignUpContext';

import {useForm, FormProvider} from 'react-hook-form';

const RoleCard: React.FC<{title: string, content: string}> = ({title, content}) => {
	return <IonCard>
	<div className='oval-element'></div>
	<IonCardHeader>
		<IonCardTitle>
			{title}
		</IonCardTitle>
	</IonCardHeader>
	<IonCardContent>
		{content}
	</IonCardContent>
</IonCard>
}

export const RoleSelect: React.FC = () => {
    const form = useForm<{role: string}>();
    const {data, setData} = useSignUpData();
    const { control, handleSubmit, formState } = form;
    
    const swiper = useSwiper();
	const teacherOption: ExtendedRadioOption = {
			component: <div><RoleCard
			title='Teacher'
			content='I want to use this app with my students'
		/></div>,
			value: 'teacher',
		
	};

	const parentOption: ExtendedRadioOption = {
		component: <div><RoleCard
				title='Parent/Caregiver'
				content='I want to use this app with my child(ren)'
			/></div>,
			value: 'parent',
		
	};

    const onSubmit = handleSubmit((responses) => { //add logic where to store user's choice
	setData({
	    ...data,
	    ...responses
	});
        swiper.slideNext();
    })

	// TODO: how do we validate it with the form hook?
	const isValid = !!form.watch('role');
        
    return (
	<>
		<form onSubmit={onSubmit}>
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
