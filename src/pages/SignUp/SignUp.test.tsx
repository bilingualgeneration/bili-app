import {
    render,
    screen,
    fireEvent,
    waitFor
} from '@testing-library/react';
import {SignUp} from '@/pages/SignUp/SignUp';

describe.only('SignUp Component', () => {
    test('should render', () => {
	const {baseElement} = render(<SignUp />);
        expect(baseElement).toBeDefined();
    });
});
