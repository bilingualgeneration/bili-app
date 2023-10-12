import {
    render,
    screen,
    fireEvent,
    waitFor
} from '@testing-library/react';
import SignUp from './SignUp'; // Update the path accordingly

const SWIPER_ANIMATION_TIMEOUT: number = 5; // in seconds

describe('SignUp Component', () => {

    test('should render', () => {
	const {baseElement} = render(<SignUp />);
        expect(baseElement).toBeDefined();
    });

    // sub test suites for each slide
    
    beforeEach(() => {
	render(<SignUp />);
    });

    describe('Role Select Slide', () => {
	test('should render', () => {
	    waitFor(() => {
		expect(screen.getByTestId('role-select-slide')).toHaveClass('swiper-slide-active');
	    }, {
		timeout: SWIPER_ANIMATION_TIMEOUT * 1000
	    });
	});
	
	// todo: add tests to ensure Teacher or Parent roles were clicked
	test('should slide to Account Credentials', () => {
	    fireEvent.click(screen.getByTestId('role-select-continue-button'));
	    
	    // since SwiperJS uses animation and only applies .swiper-slide-active after animation is done
	    // we need to use waitFor and a sufficiently long enough timeout
	    waitFor(() => {
		expect(screen.getByTestId('account-credentials-slide')).toHaveClass('swiper-slide-active');
	    }, {
		timeout: SWIPER_ANIMATION_TIMEOUT * 1000
	    });    
	});
	
	test('should prevent sliding if no role was selected', () => {
	    // todo: implement
	});
    });

    describe('Account Credentials Slide', () => {
	test('should render', () => {
	    expect(screen.getByTestId('account-credentials-slide')).toBeDefined();
	    expect(screen.getByTestId('account-credentials-email-input')).toBeDefined();
	    expect(screen.getByTestId('account-credentials-password-input')).toBeDefined();
	});
	
	test('should slide to Language Mode', () => {
	    fireEvent.input(screen.getByTestId('account-credentials-email-input'), { target: { value: 'good.email@gmail.com' } });
	    fireEvent.input(screen.getByTestId('account-credentials-password-input'), { target: { value: 'password123' } });
	    fireEvent.click(screen.getByTestId('account-credentials-continue-button'));
	    waitFor(() => {
		expect(screen.getByTestId('language-mode-slide')).toHaveClass('swiper-slide-active');
	    }, {
		timeout: SWIPER_ANIMATION_TIMEOUT * 1000
	    });
	});
    

	test('should not slide to Language Mode with invalid inputs', (done) => {
	    fireEvent.click(screen.getByTestId('account-credentials-continue-button'));
	    setTimeout(() => {
		// todo: check that some sort of error feedback is given, such as a toast etc
		expect(screen.getByTestId('account-credentials-slide')).toHaveClass('swiper-slide-active');
		done();
	    }, SWIPER_ANIMATION_TIMEOUT * 1000);
	});
    });

    describe('Language Mode Slide', () => {
	test('should render', () => {
	    expect(screen.getByTestId('language-mode-slide')).toBeDefined();	    
	});

	// todo: add tests to ensure one was selected
	test('should slide to Language Inclusivity', async () => {
	    fireEvent.click(screen.getByTestId('language-mode-continue-button'));
	    
	    // since SwiperJS uses animation and only applies .swiper-slide-active after animation is done
	    // we need to use waitFor and a sufficiently long enough timeout
	    await waitFor(() => {
		expect(screen.getByTestId('language-inclusivity-slide')).toHaveClass('swiper-slide-active');
	    }, {
		timeout: SWIPER_ANIMATION_TIMEOUT * 1000
	    });
	});
    })

    describe('Language Inclusivity Slide', () => {
	test('should render', () => {
	    expect(screen.getByTestId('language-inclusivity-slide')).toBeDefined();	    
	});

	// todo: add tests to ensure one was selected
	test('should slide to Success', async () => {
	    fireEvent.click(screen.getByTestId('language-inclusivity-continue-button'));
	    
	    // since SwiperJS uses animation and only applies .swiper-slide-active after animation is done
	    // we need to use waitFor and a sufficiently long enough timeout
	    await waitFor(() => {
		expect(screen.getByTestId('success-slide')).toHaveClass('swiper-slide-active');
	    }, {
		timeout: SWIPER_ANIMATION_TIMEOUT * 1000
	    });
	});
    });
});
