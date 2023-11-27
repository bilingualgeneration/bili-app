import {DividerText} from '@/components/DividerText';
import {
    IonButton,
    IonCheckbox,
    IonLabel,
    IonText,
} from '@ionic/react';
import { useIntl, FormattedMessage } from 'react-intl';

import {Input} from '@/components/Input';
import {useForm} from 'react-hook-form'
import {useSwiper} from 'swiper/react';

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSignUpData} from '@/pages/SignUp/SignUpContext';

import AppleIcon from '@/assets/icons/apple.svg?react';
import GoogleIcon from '@/assets/icons/google.svg?react';


//import './AccountCredentials.css';

// todo: expand Input to include checkbox

export type TeacherAccountCredentialsProps = {
    previousSlide: number
}

export const TeacherAccountCredentials: React.FC<TeacherAccountCredentialsProps> = ({
    previousSlide
}) => {
	const intl = useIntl();
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
				label={intl.formatMessage({ id: 'signUpTeacher.name', defaultMessage: 'Your full name*', description: 'Users who choose teacher must enter their name as requirement' })}
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
					label={intl.formatMessage({ id: 'signUpTeacher.email', defaultMessage: 'Your email*', description: 'Users who choose teacher must enter their email as requirement' })}
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
					label={intl.formatMessage({ id: 'signUpTeacher.school', defaultMessage: 'Your school name*', description: 'Users who choose teacher must enter the name of their school as requirement' })}
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
					label={intl.formatMessage({ id: 'signUpTeacher.password', defaultMessage: 'Password*', description: 'Users who choose teacher must enter a password as a requirement' })}
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
					text={intl.formatMessage({ id: 'login.divider', defaultMessage: 'or login using', description: 'Divider that gives user option to login using Google or Apple below' })}
				/>
				
				<IonButton
					color='medium'
					className='ion-margin-top'
					disabled
					expand='block'
					fill='outline'
					style={{opacity: 0.2}}>
				    <span style={{marginRight: '1rem'}}>
					<GoogleIcon />
				    </span>
				    <FormattedMessage id="login.google" defaultMessage="Continue with Google" />
				</IonButton>

				<IonButton
					color='medium'
					className='ion-margin-top'
					disabled
					expand='block'
					fill='outline'
				    style={{opacity: 0.2}}>
				    <span style={{marginRight: '1rem'}}>
					<AppleIcon />
				    </span>
				    <FormattedMessage id="login.apple" defaultMessage="Continue with Apple" />
				</IonButton>

				<div className='ion-margin-top'>
					<IonCheckbox
					labelPlacement='end'
					justify='start'>
					<IonText class='ion-text-wrap'>
						<IonText color='primary' style={{fontWeight: 'bold'}}>
							<FormattedMessage id="signUpTeacher.terms" defaultMessage="Terms of Service." description="Terms of Service for teachers to agree to in sign up process."/>
						</IonText> <FormattedMessage id="signUpTeacher.termsAgree" defaultMessage="I agree to the Terms of Service. I have read and understand the Privacy Policy" description="Terms of Service for teachers to agree to in sign up process."/>
					</IonText>
					</IonCheckbox>
				</div>

				<div className='ion-margin-top'>
					<IonCheckbox
					justify='start'
					labelPlacement='end'>
						<FormattedMessage id="signUpTeacher.marketing" defaultMessage="I want to receive marketing updates" description="Area for teachers to check off if they wish to receive marketing emails during sign up process"/>
					</IonCheckbox>
				</div>


				<div className='ion-margin-top'>
					<IonButton 
					data-testid='teacher-account-credentials-continue-button'
					disabled={!isValid}
					expand='block' 
					shape='round'
					type='submit'>
						<FormattedMessage id="signUpTeacher.continue" defaultMessage="Continue" description="Continue button after teachers have filled out all required info"/>
					</IonButton>
				</div>

				<div className='ion-text-center ion-margin-top'>
					<IonText color='medium'>
						<FormattedMessage id="signUpTeacher.haveAccount" defaultMessage="Already have an account?" description="Asking parents if they have an account so that they don't need to create a new one"/> <IonText> <a href="/login"><FormattedMessage id="signUpTeacher.haveAccountLogin" defaultMessage="Log in" description="Log in link for teachers in case they have an account so that they don't need to create a new one"/></a> </IonText>
					</IonText>
				</div>
            </form>
	</>
    );
}
