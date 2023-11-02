import type {
    Meta,
    StoryObj
} from '@storybook/react';

import {
    SubmitHandler,
    useForm,
    useWatch
} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Toggle} from './Toggle';

const meta: Meta<typeof Toggle> = {
    argTypes: {
	control: {
	    table: {
		disable: true
	    }
	},
	testId: {
	    table: {
		disable: true
	    }
	}
    },
    component: Toggle,
    render: ({
	defaultValue,
	...props
    }) => {
	const schema = z.object({
	    field: z.boolean()
	});
	type schemaType = z.infer<typeof schema>;
	const {
	    control
	} = useForm<schemaType>({
	    defaultValues: {
		field: defaultValue
	    },
	    mode: 'onChange',
	    resolver: zodResolver(schema)
	});
	const field: string = useWatch({
	    control,
	    name: 'field'
	});
	return (
	    <>
		<Toggle
		{...props}
		    control={control}
		    name='field'
		/>
		<br />
		value of field: {field ? 'true' : 'false'}
	    </>
	);
    }
}

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
    args: {
	label: 'label',
    }
}
