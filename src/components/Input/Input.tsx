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
	fill: 'outline' | 'solid',
    label?: string,
	labelPlacement?: string;
    name: string,
    testId?: string,
	className?: string,
    type?: 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'

export const Input = ({
    control,
    helperText,
	fill,
    label,
	labelPlacement="stacked",
    name,
    testId,
	className,
    type = 'text'
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
			className={className}
			helperText={helperText}
			fill={fill}
			label={label}
			labelPlacement={labelPlacement}
			onIonInput={onChange}
			onIonBlur={onBlur}
			type={type}
		    {...fields}
		    />
		)}
	    />
	</>
    );
}
