import type {
    Meta,
    StoryObj
} from '@storybook/react';

import {
    IonApp,
    IonButton,
    IonContent,
    IonItem,
    IonPage,
} from '@ionic/react';
import {
    SubmitHandler,
    useForm,
    useWatch
} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Input} from './Input';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const meta: Meta<typeof Input> = {
    component: Input,
    decorators: [
	(Story, component) => {
	    const schema = z.object({
		field: z.string()
	    });
	    type schemaType = z.infer<typeof schema>;
	    const {control} = useForm<schemaType>({
		resolver: zodResolver(schema)
	    });
	    const newArgs: Input = {
		control,
		name: 'field',
		...component.args,
	    }; // todo: type
	    return <IonPage>
		<IonContent className='ion-padding'>
		    <Story args={newArgs} />
		    <IonButton type='submit'>
			Submit
		    </IonButton>
		</IonContent>
	    </IonPage>
	}
    ]
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
