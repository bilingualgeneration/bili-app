import {
    beforeEach
} from 'vitest';
import {
    fireEvent,
    render,
    screen,
    waitFor
} from '@testing-library/react';

import {RoleSelect} from '@/pages/SignUp/RoleSelect';

describe('SignUp Page Role Select Slide', () => {
    beforeEach(() => {
	render(<RoleSelect />);
    });
    
    afterEach(() => {
	// cleanup?
    });

    test('should render', () => {
	// todo:
    });
    
    // todo: add tests to ensure Teacher or Parent roles were clicked
    test('should slide to Account Credentials', () => {
	fireEvent.click(screen.getByTestId('role-select-continue-button'));
	
	// since SwiperJS uses animation and only applies .swiper-slide-active after animation is done
	// we need to use waitFor and a sufficiently long enough timeout
	//expect(screen.getByTestId('account-credentials-slide')).toHaveClass('swiper-slide-active');
    });
    
    test('should prevent sliding if no role was selected', () => {
	// the continue button should be disabled
	// todo: implement
    });
});
