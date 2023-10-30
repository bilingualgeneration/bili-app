import type {
    Meta,
    StoryObj
} from '@storybook/react';
import {
    JSX,
    PropsWithChildren
} from 'react';
import {
    SubmitHandler,
    useForm,
    useWatch
} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonText,
} from '@ionic/react';

import {
    LoremIpsum
} from 'react-lorem-ipsum';
import {
    ExtendedRadio,
    ExtendedRadioOption
} from './ExtendedRadio';

import './stories.css';

const meta: Meta<typeof ExtendedRadio> = {
    component: ExtendedRadio,
    render: (props) => {
	const schema = z.object({
	    field: z.string()
	});
	const {
	    control
	} = useForm<z.infer<typeof schema>>({
	    resolver: zodResolver(schema)
	});

	const field: string = useWatch({
	    control,
	    name: 'field'
	});
	
	return (
	    <>
		<ExtendedRadio
		{...props}
		    control={control}
		    name='field' />
		<IonText>
		    Selected Value: {field || 'none'}
		</IonText>
	    </>
	);
    }
};

export default meta;
type Story = StoryObj<typeof ExtendedRadio>;

// todo: better typing to use props from IonCard
const Card = ({children, ...props}: PropsWithChildren<any>): JSX.Element => {
    return (
	<IonCard {...props}>
	    <IonCardHeader>
		<IonCardTitle>
		    {children}
		</IonCardTitle>
	    </IonCardHeader>
	    <IonCardContent>
		<LoremIpsum random={false} />
	    </IonCardContent>
	</IonCard>
    );
}

const options: ExtendedRadioOption[] = [
    {
	component: <Card>English</Card>,
	value: 'english'
    },
    {
	component: <Card>Español</Card>,
	value: 'spanish'
    },
    {
	component: <Card>한국인</Card>,
	value: 'korean'
    },
];

export const Primary: Story = {
    args: {
	options
    }
}
