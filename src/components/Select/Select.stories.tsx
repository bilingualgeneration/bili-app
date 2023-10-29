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

import {Select} from './Select';
import type {SelectOption} from './Select';

const options: SelectOption[] = [
    {
	value: 'paella',
	label: 'Paella'
    },
    {
	value: 'risotto',
	label: 'Risotto'
    },
    {
	value: 'churros',
	label: 'Churros'
    }
];

const meta: Meta<typeof Select> = {
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
    component: Select,
    render: ({
	defaultValue,
	...props
    }) => {
	const schema = z.object({
	    field: z.string()
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
		<Select
		{...props}
		    control={control}
		    name='field'
		options={options}
		/>
		<br />
		value from form: {field}
	    </>
	);

    }	
}

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
    args: {
	label: 'label',
    }
}

export const AsPopover: Story = {
    args: {
	label: 'label',
	interface: 'popover'
    }
}

export const WithDefaultValue: Story = {
    args: {
	label: 'label',
	defaultValue: 'churros'
    }
}
