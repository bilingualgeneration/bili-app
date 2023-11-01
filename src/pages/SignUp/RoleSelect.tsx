import {
    ExtendedRadio,
    ExtendedRadioOption
} from '@/components/ExtendedRadio';

import {
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
    IonText,
} from '@ionic/react';

import {
    useSwiper
} from 'swiper/react';
import {
    useSignUpData
} from '@/pages/SignUp/SignUpContext';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

// @ts-ignore todo: cannot find module or its corresponding type declarations
import HouseIcon from '@/assets/icons/house.svg?react';
// @ts-ignore todo: cannot find module or its corresponding type declarations
import SchoolIcon from '@/assets/icons/school.svg?react';

import "./RoleSelect.css";
import { string } from 'zod';
import { CollectionReference } from 'firebase/firestore';
import { RadioCard } from '@/components/RadioCard';

export type RoleSelectProps = {
    teacherSlide: number,
    parentSlide: number
}

export const RoleSelect: React.FC<RoleSelectProps> = ({
    teacherSlide,
    parentSlide
}) => {
    const schema = z.object({
	role: z.string().min(1)//nonempty was deprecated
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
	 setData({ 
	 	...data,
		...responses
	 });
	// @ts-ignore todo: better typing
	if(responses.role === 'teacher'){
	    swiper.slideTo(teacherSlide);
	}
	// @ts-ignore todo: better typing
	if(responses.role === 'parent'){
	    swiper.slideTo(parentSlide);
	}
    })

    
    return (
	<>
	    <form onSubmit={onSubmit} className='radio-button-select'>
		<IonText className='ion-text-center'>
		    <h1>
			Which best describes you?
		    </h1>
		</IonText>
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
		    Continue
		</IonButton>
	    </form>
	    
	</>
    );
}
