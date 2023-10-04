import type {
    Meta,
    StoryObj
} from '@storybook/react';

import {
    IonApp,
    IonContent,
    IonItem,
    IonPage
} from '@ionic/react';
import {Input} from './Input';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

const meta: Meta<typeof Input> = {
    component: Input,
    render: (props: Input) => ({
	props
    }),
    decorators: [
	(Story) => (
	    <IonApp>
		<IonPage>
		    <IonContent className='ion-padding'>
			<Story />
		    </IonContent>
		</IonPage>
	    </IonApp>
	)
    ]
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    props: {}
}

export const WithLabel: Story = {
    render: () => <Input label='label' />
}

export const WithHelperText: Story = {
    render: () => <Input helperText='helper text' />
}
