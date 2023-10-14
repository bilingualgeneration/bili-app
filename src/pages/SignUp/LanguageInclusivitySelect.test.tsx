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
    
    test('should render', () => {
	expect(screen.getByTestId('language-inclusivity-slide')).toBeDefined();	    
    });
    
    test('should slide to Success', async () => {
	fireEvent.click(screen.getByTestId('language-inclusivity-continue-button'));
    });
});
