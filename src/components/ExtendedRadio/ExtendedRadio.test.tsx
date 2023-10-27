import {
    describe,
    expect,
    it
} from 'vitest';
import {
    FC,
    JSX
} from 'react';

import {
    cleanup,
    fireEvent,
    render,
    renderHook,
    screen
} from '@testing-library/react';
import {
    SubmitHandler,
    useForm,
    useWatch
} from 'react-hook-form';

import {
    ExtendedRadio,
    ExtendedRadioOption
} from './ExtendedRadio';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const generateOption = (text: string): ExtendedRadioOption => {
    return {
	component: <div>{text}</div>,
	value: text
    };
}

describe('Extended Radio', () => {
    // todo: transform this into beforeEach()
    const schema = z.object({
	field: z.string()
    });
    type schemaType = z.infer<typeof schema>;
    
    const {
	control
    } = useForm<schemaType>({
	resolver: zodResolver(schema)
    });
    
    const field: string = useWatch({
	control,
	name: 'field'
    });

    const options: ExtendedRadioOption[] = [
	generateOption('hello'),
	generateOption('world'),
	generateOption('hola'),
	generateOption('mundo')
    ];
    
    it('should render each option', () => {
	render(
	    <ExtendedRadio
	    name='field'
	    control={control}
	    options={options}
	    />
	);
    });

    it('should add the default active class to a clicked component', () => {
	const {container} = render(
	    <ExtendedRadio
		name='field'
		control={control}
		options={options}
	    />
	);
	const target: Element | null = container.querySelector('[data-testId=extended-radio-component] *:nth-child(2)');
	expect(target).not.toBe(null);
	fireEvent.click(target!);
	expect(target!).toHaveClass('active');
    });

    /*
    it('should ', () => {

    });

    it('should ', () => {

    });
    */
});

