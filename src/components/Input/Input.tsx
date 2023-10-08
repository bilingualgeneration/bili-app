import {JSX} from 'react';
import {
    Control,
    Controller
} from 'react-hook-form';
import {
    IonInput, IonLabel
} from '@ionic/react';


// todo: find a way for props to be required?
export type Input = {
    control: Control,
    helperText: string,
    label: string,
    name: string,
	testId?: string
};

export const Input = ({
    control,
    helperText,
    label,
    name,
	testId
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
		    data-testid={testId}
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
