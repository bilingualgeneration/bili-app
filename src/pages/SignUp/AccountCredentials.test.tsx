import {
    render,
    screen,
    fireEvent,
    waitFor
} from '@testing-library/react';
import {AccountCredentials} from '@/pages/SignUp/AccountCredentials';

describe('SignUp Page', () => {
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
		expect(screen.getByTestId('language-mode-slide')).toHaveClass('swiper-slide-active');
	});
    

	test('should not slide to Language Mode with invalid inputs', () => {
	    fireEvent.click(screen.getByTestId('account-credentials-continue-button'));
	    expect(screen.getByTestId('account-credentials-slide')).toHaveClass('swiper-slide-active');
	});
    });
});
