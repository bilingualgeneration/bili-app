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

import HouseIcon from '@/assets/icons/house.svg?react';
import SchoolIcon from '@/assets/icons/school.svg?react';

import "./RoleSelect.css";

const RoleCard: React.FC<{title: string, content: string, icon: React.ReactNode}> = ({title, content, icon}) => {
    return <IonCard>
	<div className='card-inner'>
	    <div className='oval-element'>
			{icon}
	    </div>
	    <div className='title-content'>
			<IonCardHeader class='custom-ion-header'>
				<IonCardTitle>
				{title}
				</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				{content}
			</IonCardContent>
	    </div>
	    
	</div>
    </IonCard>
}

export const RoleSelect: React.FC = () => {
    const form = useForm<{role: string}>();
    const {data, setData} = useSignUpData();
    const { control, handleSubmit, formState } = form;
    
    const swiper = useSwiper();
    const teacherOption: ExtendedRadioOption = {
	component: 
	<div>
		<RoleCard
			title='Teacher'
			content='I want to use this app with my students'
			icon={<SchoolIcon/>}	
	    />
	</div>,
	value: 'teacher',
	
    };

    const parentOption: ExtendedRadioOption = {
	component: 
	<div>
		<RoleCard
			title='Parent/Caregiver'
			content='I want to use this app with my child(ren)'
			icon={<HouseIcon/>}
	    />
	</div>,
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
