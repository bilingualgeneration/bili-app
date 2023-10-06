import { act } from 'react-dom/test-utils';
import { cleanup, render, screen, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import SignUp from './SignUp'; // Update the path accordingly

afterEach(() => {
    cleanup();
});

describe('SignUp Component', () => {
    const schema = z.object({
        email: z.string(),
        password: z.string(),
    });
    type schemaType = z.infer<typeof schema>;

    const { result } = renderHook(() => useForm<schemaType>({
        resolver: zodResolver(schema)
    }));

    const control = result.current.control;

    beforeEach(async () => {
        await act(async () => {
            result.current.reset();
        });
    });

    test('should render', () => {
        const { baseElement } = render(<SignUp />);
        expect(baseElement).toBeDefined();
    });

    test('should render an email input', () => {
        render(<SignUp 
        />);
        const element = screen.getByTestId('email-signup-test');
        expect(element).toBeDefined();
    });

    test('should render a password input', () => {
        render(<SignUp />);
        const element = screen.getByTestId('password-signup-test');
        expect(element).toBeDefined();
    });

    test('should display error message for invalid email', async () => {
        render(<SignUp />);
        fireEvent.input(screen.getByTestId('email-signup-test'), { target: { value: 'invalidEmail' } });
        fireEvent.input(screen.getByTestId('password-signup-test'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Sign Up'));
        
        await waitFor(() => {
            expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
        });
    });

});




