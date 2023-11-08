import {
    beforeEach,
    describe,
    it
} from 'vitest';

import {
    render,
    screen,
    fireEvent,
    waitFor
} from '@testing-library/react';
import {LanguageInclusivitySelect} from '@/pages/SignUp/LanguageInclusivitySelect';

describe('Language Inclusivity Slide', () => {
    beforeEach(() => {
	render(<LanguageInclusivitySelect />);
    });
    
    it('should render', () => {
	//expect(screen.getByTestId('language-inclusivity-slide')).toBeDefined();	    
    });
    
    it('should slide to Success', async () => {
	//fireEvent.click(screen.getByTestId('language-inclusivity-continue-button'));
    });
});
