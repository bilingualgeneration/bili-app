import type {
    Meta,
    StoryObj
} from '@storybook/react';

import {
    IonItem
} from '@ionic/react';
import {
    SubmitHandler,
    useForm,
    useWatch
} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Input} from './Input';

const meta: Meta<typeof Input> = {
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
    component: Input,
    render: (props) => {
	const schema = z.object({
	    field: z.string()
		    .min(3)
		    .max(100)
	});
	type schemaType = z.infer<typeof schema>;
	const {
	    control,
	    handleSubmit
	} = useForm<schemaType>({
	    mode: 'onChange',
	    resolver: zodResolver(schema)
	});
	const field: string = useWatch({
	    control,
	    name: 'field'
	});
	return (
	    <>
		<Input
		{...props}
		    control={control}
		    name='field'
		/>
	    </>
	);
    }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
	counter: true,
	label: 'label',
	maxlength: 200,
	minlength: 10,
	helperText: 'helper text'
    }
}

export const AsPassword: Story = {
    args: {
	type: 'password',
	label: 'password',
	helperText: 'must contain a number and symbol'
    }
}
