import {
    Control,
    Controller,
} from 'react-hook-form';
import {
    IonCheckbox
} from '@ionic/react';

import {
    FC,
    JSX,
    useState
} from 'react';

export type MultipleCheckboxOption = {
    value: any,
    label: string 
}

type IonCheckboxProps = {
    alignment: 'center' | 'start',
    checked: boolean,
    color: 'danger'
	 | 'dark'
	 | 'light'
	 | 'medium'
	 | 'primary'
	 | 'secondary'
	 | 'success'
	 | 'tertiary'
	 | 'warning'
	 | string
	 | undefined,
    disabled: boolean,
    indeterminate: boolean,
    justify: 'end' | 'space-between' | 'start',
    labelPlacement: 'end' | 'fixed' | 'stacked' | 'start',
    // legacy: boolean | undefined, // don't support legacy
    mode: 'ios' | 'md',
    name: string,
    value: any
}

type MultipleCheckboxAdditionalProps = {
    control: Control<any>,
    name: string,
    options: MultipleCheckboxOption[],
    testId: string,
    wrapper: FC<{children: JSX.Element}>
}

export type MultipleCheckboxProps = Partial<IonCheckboxProps>
				  & Partial<MultipleCheckboxAdditionalProps>
				  & Pick<IonCheckboxProps, 'name'>
				  & Pick<MultipleCheckboxAdditionalProps, 'control'>

export const MultipleCheckbox = ({
    control,
    name,
    options = [],
    testId,
    wrapper: Wrapper = ({children}) => children,
    ...props
}: MultipleCheckboxProps): JSX.Element => {
    const [values, setValues] = useState<string[]>([]);
    return (
	<Controller
	control={control}
	data-testid={testId || 'extended-radio-component'}
	name={name}
	render={
	    ({
		field: {
		    onChange
		}
	    }): JSX.Element => (
		<>
		    {options.map((option) =>
			<Wrapper key={option.value}>
			    <IonCheckbox
				onIonChange={(event) => {
				    let newValues: string[];
				    if(event.detail.checked){
					newValues = [
					    ...values,
					    option.value
					];
				    } else {
					newValues = values.filter(v => v !== option.value);
				    }
				    setValues(newValues);
				    onChange(newValues);
				}}
				value={option.value}			
				{...props}>
				{option.label}
			    </IonCheckbox>
			</Wrapper>
		    )}
		</>
	)}
	/>
    );
}
