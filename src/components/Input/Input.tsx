import {JSX} from 'react';
import {
    Control,
    Controller
} from 'react-hook-form';
import {
    IonInput
} from '@ionic/react';


// todo: find a way for props to be required?
export type Input = {
    control: Control,
    helperText?: string,
    label?: string,
    name: string
};

export const Input = ({
    control,
    helperText,
    label,
    name
}: Input): JSX.Element => {
    return (
	<>
	    <Controller
		name={name}
		control={control}
		render={({
		    field: {
			onChange,
			onBlur,
			...fields
		    }
		}: any): JSX.Element => (
		    <IonInput
		    data-testid='ion-input-component'
		    helperText={helperText}
		    label={label}
		    onIonInput={onChange}
		    onIonBlur={onBlur}
		    {...fields}
		    />
		)}
	    />
	</>
    );
}
