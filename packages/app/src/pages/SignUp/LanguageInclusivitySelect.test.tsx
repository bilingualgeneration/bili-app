import {
    beforeEach,
    describe,
    it,
    expect
} from 'vitest';

import {
    render,
    screen,
    fireEvent,
    waitFor
} from '@testing-library/react';
import {LanguageInclusivitySelect} from '@/pages/SignUp/LanguageInclusivitySelect';
import { IntlProvider } from 'react-intl';

describe('Language Inclusivity Slide', () => {
    const messages = {
        'languageInclusivity.excludeGenderNeutralTitle': 'Exclude gender neutral pronouns',
        'languageInclusivity.includeGenderNeutralTitle': 'Inclusive language',
        
      };

    beforeEach(() => {
        render(
            <IntlProvider locale="en" messages={messages}>
              <LanguageInclusivitySelect />
            </IntlProvider>
          );
    });

    it('should render', () => {
        // Check if the component rendered with all necessary parts
        expect(screen.getByTestId('language-inclusivity-continue-button')).toBeDefined();
        expect(screen.getByText('Exclude gender neutral pronouns')).toBeDefined();
        expect(screen.getByText('Inclusive language')).toBeDefined();
    });

    it('should enable the continue button when a LanguageInclusivity is selected', async () => {
    
    
        // Initially, the continue button should be disabled
        expect(screen.getByTestId('language-inclusivity-continue-button')).toHaveAttribute('disabled','true')
    
        // Simulate the user clicking the Exclude gender neutral pronouns
        fireEvent.click(screen.getByText('Exclude gender neutral pronouns')); 
    
        // After clicking, the continue button should be enabled
        await waitFor(() => {
            expect(screen.getByTestId('language-inclusivity-continue-button')).toHaveAttribute('disabled','false')
        })
    });

});
