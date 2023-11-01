import {
    FC,
    JSX
} from 'react';
import {
    IonButton,
    IonCol,
    IonGrid,
    IonRow,
    IonText
} from '@ionic/react';
import {useForm} from 'react-hook-form';
import {useSignUpData} from '@/pages/SignUp/SignUpContext';
import {MultipleCheckbox} from '@/components/MultipleCheckbox';
import type {
    MultipleCheckboxAdditionalProps,
    MultipleCheckboxOption
} from '@/components/MultipleCheckbox';

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const OptionWrapper: Pick<MultipleCheckboxAdditionalProps, 'wrapper'> = ({children}) => {
    return (
	<IonCol size="4">
	    {children}
	</IonCol>
    );
}

export const TeacherAbout: FC = () => {
    // todo: these zod schemas are wrong
    const schema = z.object({
        grades: z.string().array().optional(),
        roles: z.string().array().optional()
    });
    const {
	control,
	handleSubmit,
	formState: {isValid},
    } = useForm<FormInputs>({
	defaultValues: {
	    grades: [],
	},
        mode: 'onChange',
        resolver: zodResolver(schema)
    });

    const gradesOptions: MultipleCheckboxOption[] = [
	{
	    label: 'Pre-K',
	    value: 'prek'
	},
	{
	    label: '1st Grade',
	    value: '1st'
	},
	{
	    label: '2nd Grade',
	    value: '2nd'
	},
	{
	    label: '3rd Grade',
	    value: '3rd'
	},
	{
	    label: '4th Grade',
	    value: '4th'
	},
	{
	    label: 'Other',
	    value: 'other'
	},
    ];

    const rolesOptions: MultipleCheckboxOption[] = [
	{
	    label: 'Administrator',
	    value: 'administrator'
	},
	{
	    label: 'Teacher',
	    value: 'teacher'
	},
	{
	    label: 'Counselor',
	    value: 'counselor'
	},
	{
	    label: 'Facilitator',
	    value: 'facilitator'
	}
    ];

    const onSubmit = handleSubmit((response) => {
	console.log(response);
    });

    return (
	<>
            <form
		onSubmit={onSubmit}>
		<div>
		    <IonText>
			<h1>
			    Tell us about yourself
			</h1>
		    </IonText>
		</div>
		<div>
		    <IonText>
			<h2>
			    What grade(s) do you work with?
			</h2>
		    </IonText>
		</div>
		<div>
		    <IonGrid>
			<IonRow>
			    <MultipleCheckbox
			    control={control}
			    labelPlacement='end'
			    options={gradesOptions}
			    name='grades'
			    wrapper={OptionWrapper}
			    />
			</IonRow>
		    </IonGrid>
		</div>
		<div>
		    <IonText>
			<h2>
			    What is your role?
			</h2>
		    </IonText>
		</div>
		<div>
		    <IonGrid>
			<IonRow>
			    <MultipleCheckbox
			    control={control}
			    labelPlacement='end'
			    options={rolesOptions}
			    name='roles'
			    wrapper={OptionWrapper}
			    />
			</IonRow>
		    </IonGrid>
		</div>

		<IonButton
		    expand='block'
		    shape='round'
		    type='submit'
		    data-testid='teacher-about-continue-button'
		    disabled={!isValid}>
		    Continue
		</IonButton>
	    </form>	    
	</>
    );
}
