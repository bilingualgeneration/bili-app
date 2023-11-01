import {DividerText} from '@/components/DividerText';
import {
    IonButton,
    IonCheckbox,
    IonLabel,
    IonText,
} from '@ionic/react';

import {Input} from '@/components/Input';
import {useForm} from 'react-hook-form'
import {useSwiper} from 'swiper/react';

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSignUpData} from '@/pages/SignUp/SignUpContext';

// @ts-ignore todo: cannot find module or its corresponding type declarations
import AppleIcon from '@/assets/icons/apple.svg?react';
// @ts-ignore todo: cannot find module or its corresponding type declarations
import GoogleIcon from '@/assets/icons/google.svg?react';


//import './AccountCredentials.css';

// todo: expand Input to include checkbox

export type TeacherAccountCredentialsProps = {
    previousSlide: number
}

export const TeacherAccountCredentials: React.FC<TeacherAccountCredentialsProps> = ({
    previousSlide
}) => {
    const {data, setData} = useSignUpData();
    const swiper = useSwiper();
    const schema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
	school: z.string().min(1),
        password: z.string().min(8),
	//tos: z.literal<boolean>(true),
	//marketingUpdates: z.boolean()
    });

    const {
	control,
	handleSubmit,
	formState: { errors, isValid},
    } = useForm<z.infer<typeof schema>>({
        mode: 'onChange',
        resolver: zodResolver(schema)
    });

    const onSubmit = handleSubmit((response) => {
	console.log(response);
	setData({
	    ...data,
	    ...response
	});
	swiper.slideNext();
    });

    return (
	<>
            <form onSubmit={onSubmit}>
		<Input
		label='Your full name*'
		labelPlacement='above'
		name="name"
		fill="outline"
		control={control}
		helperText=""
		testId="teacher-account-credentials-name-input"
		type="text"
		/>

		<div className='ion-margin-top'>
		    <Input
		    label='Your email address*'
		    labelPlacement='above'
		    required={true}
		    name="email"
		    control={control}
		    fill="outline"
		    helperText=""
		    testId="teacher-account-credentials-email-input"
		    type="email"
		    />
		</div>

		<div className='ion-margin-top'>
		    <Input
		    label='Your school name*'
		    labelPlacement='above'
		    required={true}
		    name="school"
		    control={control}
		    fill="outline"
		    helperText=""
		    testId="teacher-account-credentials-email-input"
		    type="text"
		    />
		</div>

		<div className='ion-margin-top'>
		    <Input
		    label='Password* (8+ characters)'
		    labelPlacement='above'
		    required={true}
		    name="password"
		    control={control}
		    fill="outline"
		    helperText=""
		    testId="teacher-account-credentials-password-input"
		    type="password"
		    />
		</div>
		
		<DividerText
		className='ion-margin-top'
		    text='or'
		/>
		
		<IonButton
		    color='medium'
		    className='ion-margin-top'
		    disabled
		    expand='block'
		    fill='outline'
		    style={{opacity: 0.2}}>
		    <GoogleIcon style={{marginRight: '1rem'}} /> Continue with Google
		</IonButton>

		<IonButton
		    color='medium'
		    className='ion-margin-top'
		    disabled
		    expand='block'
		    fill='outline'
		    style={{opacity: 0.2}}>
		    <AppleIcon style={{marginRight: '1rem'}} /> Continue with Apple
		</IonButton>

		<div className='ion-margin-top'>
		    <IonCheckbox
			labelPlacement='end'
			justify='start'>
			<IonText class='ion-text-wrap'>
			    <IonText color='primary' style={{fontWeight: 'bold'}}>
				Terms of Service.
			    </IonText> I agree to the Terms of Service. I have read and understand the Privacy Policy
			</IonText>
		    </IonCheckbox>
		</div>

		<div className='ion-margin-top'>
		    <IonCheckbox
			justify='start'
			labelPlacement='end'>
			I want to receive marketing updates
		    </IonCheckbox>
		</div>


		<div className='ion-margin-top'>
		    <IonButton 
			data-testid='teacher-account-credentials-continue-button'
			disabled={!isValid}
			expand='block' 
			shape='round'
			type='submit'>
			Continue
		    </IonButton>
		</div>

		<div className='ion-text-center ion-margin-top'>
		    <IonText color='medium'>
			Already have an account? <IonText>Log in (make me a link)</IonText>
		    </IonText>
		</div>
            </form>
	</>
    );
}
