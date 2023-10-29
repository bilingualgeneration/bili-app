import {
    render,
    screen,
    fireEvent,
    waitFor
} from '@testing-library/react';
import {LanguageModeSelect} from '@/pages/SignUp/LanguageModeSelect';

describe('SignUp Page Language Mode Slide', () => {
    beforeEach(() => {
	render(<LanguageModeSelect />);
    });
    test('should render', () => {
	//expect(screen.getByTestId('language-mode-slide')).toBeDefined();    
    });

    // todo: add tests to ensure one was selected
    test('should slide to Language Inclusivity', async () => {

	//fireEvent.click(screen.getByTestId('language-mode-continue-button'));
	
	//expect(screen.getByTestId('language-inclusivity-slide')).toHaveClass('swiper-slide-active');
    });
});
