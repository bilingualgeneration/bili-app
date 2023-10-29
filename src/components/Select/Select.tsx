import {
    JSX
} from 'react';
import {
    Control,
    Controller
} from 'react-hook-form';
import {
    IonSelect,
    IonSelectOption
} from '@ionic/react';

export type SelectOption = {
    value: string,
    label: string
};

export type IonSelect = {
    cancelText: string,
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
    compareWith: ((currentValue: any, compareValue: any) => boolean)
	       | null
	       | string
	       | undefined,
    disabled: boolean,
    expandedIcon: string | undefined,
    fill: 'outline' | 'solid' | undefined,
    interface: 'action-sheet' | 'alert' | 'popover',
    interfaceOptions: any,
    justify: 'end' | 'space-between' | 'start',
    label: string | undefined,
    labelPlacement: 'fixed' | 'floating' | 'stacked' | undefined,
    legacy: boolean | undefined,
    mode: 'ios' | 'md',
    multiple: boolean,
    name: string,
    okText: string,
    placeholder: string | undefined,
    selectedText: null | string | undefined,
    shape: 'round' | undefined,
    toggleIcon: string | undefined,
    value: any
}

export type SelectAdditionalProps = {
    control: Control<any>,
    options: SelectOption[],
    testId: string | undefined
}

export type Select = Partial<IonSelect>
		   & Partial <SelectAdditionalProps>
		   & Pick<IonSelect, 'name'>
		   & Pick<SelectAdditionalProps, 'control'>
		   & Pick<SelectAdditionalProps, 'options'>;

export const Select = ({
    control,
    options,
    testId,
    ...props
}: Select): JSX.Element => {
    return (
	<>
	<Controller
	name={props.name}
	control={control}
	render={({
	    field: {
		onChange,
		onBlur,
		...fields
	    },
	    fieldState
	}: any): JSX.Element => {

	    return (
		<IonSelect
		    {...props}
		    onIonChange={
		    (event) => {
			console.log(event.detail.value);
			onChange(event.detail.value);
		    }
		    }>
		    {options.map((option: SelectOption) => <IonSelectOption value={option.value} key={option.value}>
		    {option.label}
		    </IonSelectOption>)
		    }
		</IonSelect>
		);
	}}
	/>
	</>
    );
}
