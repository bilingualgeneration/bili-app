import {
    createElement,
    FC,
    Fragment,
    JSX,
    useState
} from 'react';

import {
    Control,
    Controller,
} from 'react-hook-form';

export type ExtendedRadioOption = {
    component: JSX.Element,
    value: string | number,
    disabled?: boolean
}

// todo: add clear button?
export type ExtendedRadioProps = {
    activeClass?: string,
    control: Control,
    disabledClass?: string,
    name: string,
    options: ExtendedRadioOption[]
}

export const ExtendedRadio: FC = ({
    activeClassName = 'active',
    control,
    disabledClass = 'disabled',
    name,
    options
}: ExtendedRadioProps) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const handleClick = (index: number): void => {
	setActiveIndex(index);
    };
    return (
	<Controller
	control={control}
	data-testid='extended-radio-component'
	name={name}
	render={
	    ({
		field: {
		    onChange
		}
	    }): JSX.Element => (
		<span data-testid='extended-radio-component'>
		    {options.map((option, index) =>
			{
			    const props = {
				...option.component.props,
				key: index,
				className: option.component.props.className
					 + (activeIndex === index ? ' ' + activeClassName : ''),
				onClick: () => {
				    if(!option.disabled){
					setActiveIndex(index);
					onChange(option.value);
				    }
				}
			    };
			    return <option.component.type
			    {...props}
				       key={index}
			    />
			}
		    )}
		</span>
	    )
	}
	/>
    );
}
