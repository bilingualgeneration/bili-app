import {act} from 'react-dom/test-utils';
import {
    afterEach,
    describe,
    expect,
} from 'vitest';
import {
    cleanup,
    fireEvent,
    render,
    renderHook,
    screen
} from '@testing-library/react';
import {Input} from '@/components/Input';
import {
    IonInput
} from '@ionic/react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    SubmitHandler,
    useForm
} from 'react-hook-form';


afterEach(() => {
    cleanup(); // clear jsdom, etc
});

describe('Input Component', () => {
    const schema = z.object({
	field: z.string()
    });
    type schemaType = z.infer<typeof schema>;
    
    const {
	result
    } = renderHook(() => useForm<schemaType>({
	resolver: zodResolver(schema)
    }));

    const control: Control = result.current.control;
    
    beforeEach(async () => {
	// reset the form values for each test
	// need to wrap in act() because reset() alters react state
	await act(
	    async () => {
		result.current.reset();
	    }
	);
    });
    
    test('should render', () => {
	const {baseElement} = render(
	    <Input
		control={control}
		name='field'
	    />);
	expect(baseElement).toBeDefined();
    });

    test('should render an IonInput by default', () => {
	render(
	    <Input
		control={control}
		name='field'
		testId='ion-input-component'
	    />);
	const element = screen.getByTestId('ion-input-component');
	expect(element).toBeDefined();
    });

    test('should render a label', () => {
	const {container} = render(
	    <Input
		control={control}
		label='label'
		name='field'
	    />);
	expect(container.querySelector('ion-label')).toBeDefined();
    });

    test('should render helper text', () => {
	const {container} = render(
	    <Input
		control={control}
		helperText='helper text'
		name='field'
	    />);
	expect(container.querySelector('.helper-text')).toBeDefined();
    });


	const types: Array<Input["type"]> = 
	['date', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 
	'tel', 'text', 'time', 'url', 'week'];
    types.forEach(type => {
        test.only(`should render input with type ${type}`, () => {
            const { container, getByTestId } = render(
                <Input
                    control={control}
                    name='field'
                    type={type} 
					testId={`input-${type}`}
                />
            );

            const inputElement = getByTestId(`input-${type}`)
            expect(inputElement.getAttribute('type')).toBe(type);
        });
    });

})



describe('Input Component', () => {
    const schema = z.object({
	field: z.string()
    });
    type schemaType = z.infer<typeof schema>;
    
    const {
	result
    } = renderHook(() => useForm<schemaType>({
	resolver: zodResolver(schema)
    }));
    const control: Control = result.current.control;
    
    beforeEach(async (): void => {
	// reset the form values for each test
	// need to wrap in act() because reset() alters react state
	await act(
	    async () => {
		result.current.reset();
	    }
	);
    });
    
    test('should integrate react hook forms', () => {
	// JC: test failing, suspect because of input in shadow dom
	const onSubmit: SubmitHandler<schemaType> = (data) => {
	    expect(schema.parse(data)).toBe('abc');
	};

	const {container} = render(
	    <form>
		<Input
		control={control}
		name='field'
		/>
		<button type='submit'></button>
	    </form>
	);
	fireEvent.change(
	    container.querySelector('input'),
	    {target: {value: 'abc'}}
	);
	fireEvent.click(
	    container.querySelector(`[type='submit']`)
	);
    });
});
