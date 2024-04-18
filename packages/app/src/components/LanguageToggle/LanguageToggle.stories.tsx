import type { Meta, StoryObj } from "@storybook/react";
import {
  LanguageToggle,
  LanguageToggleProvider
} from "./LanguageToggle";
import '@/theme/style-classes.css';

const meta: Meta<typeof Input> = {
  argTypes: {
    control: {
      table: {
        disable: true,
      },
    },
    testId: {
      table: {
        disable: true,
      },
    },
  },
  component: LanguageToggle,
  render: (props) => {
    return (
      <>
	<LanguageToggleProvider {...props}>
	  <LanguageToggle />
	</LanguageToggleProvider>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
  },
};

export const OnlyEN_ES: Story = {
  args: {
    allowedLanguages: ['en', 'es']
  },
};

export const OnlyES: Story = {
  args: {
    allowedLanguages: ['es']
  },
};
