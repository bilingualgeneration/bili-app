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
import {
    IonItem
} from '@ionic/react';


import {
    MultipleCheckbox,
    MultipleCheckboxOption
} from './MultipleCheckbox';

const options: MultipleCheckboxOption[] = [
    {
	value: 'dr who',
	label: 'Dr. Who'
    },
    {
	value: 'star trek',
	label: 'Star Trek'
    },
    {
	value: 'warehouse 13',
	label: 'Warehouse 13'
    },
]

const meta: Meta<typeof MultipleCheckbox> = {
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
    component: MultipleCheckbox,
    render: (props) => {
	const schema = z.object({
	    field: z.string() // todo: allow numbers? other values?
		    .array()
	});
	type schemaType = z.infer<typeof schema>;
	const {
	    control,
	    handleSubmit
	} = useForm<schemaType>({
	    defaultValues: {
		field: []
	    },
	    mode: 'onChange',
	    resolver: zodResolver(schema)
	});
	const field: string[] = useWatch({
	    control,
	    name: 'field'
	});
	return (
	    <>
		<MultipleCheckbox
		{...props}
		    control={control}
		    name='field'
		    options={options}
		/>
		<div class='ion-margin-top'>
		    value of field: {field.join(', ')}
		</div>
	    </>
	);
    }
};

export default meta;
type Story = StoryObj<typeof MultipleCheckbox>;

export const Default: Story = {
    args: {}
}

export const WithWrapper: Story = {
    args: {
	wrapper: ({children}) => <IonItem>{children}</IonItem>
    }
}
