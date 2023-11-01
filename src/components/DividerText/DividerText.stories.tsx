import type {
    Meta,
    StoryObj
} from '@storybook/react';

import {DividerText} from './DividerText';

const meta: Meta<typeof DividerText> = {
    component: DividerText,
    render: (props) => {
	return (
	    <>
		<DividerText
		    {...props}
		/>
	    </>
	);
    }
};

export default meta;
type Story = StoryObj<typeof DividerText>;

export const Default: Story = {
    args: {
	text: 'divider'
    }
}
