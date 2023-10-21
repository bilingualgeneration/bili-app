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
    component: Input,
    render: (props) => {
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

    }
}

export const WithLabel: Story = {
    args: {
	label: 'label'
    }
}

export const WithHelperText: Story = {
    args: {
	helperText: 'helper text'
    }
}
