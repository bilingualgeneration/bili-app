import { act } from 'react-dom/test-utils';
import { cleanup, render, screen, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Login from './Login'; // Update the path accordingly

afterEach(() => {
    cleanup();
});

describe('Login Component', () => {
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

    test('should render an email input', () => {
        render(<Login />);
        const element = screen.getByTestId('email-login-test');
        expect(element).toBeDefined();
    });

    test('should render a password input', () => {
        render(<Login />);
        const element = screen.getByTestId('password-login-test');
        expect(element).toBeDefined();
    });

    test('should display error message for missing email', async () => {
        render(<Login />);
        fireEvent.input(screen.getByTestId('email-login-test'), { target: { value: '' } });
        fireEvent.click(screen.getByText('Login'));
        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });
    
    test('should display error message for missing password', async () => {
        render(<Login />);
        fireEvent.input(screen.getByTestId('password-login-test'), { target: { value: '' } });
        fireEvent.click(screen.getByText('Login'));
        await waitFor(() => {
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });

    test('should display error message for invalid email', async () => {
        render(<Login />);
        fireEvent.input(screen.getByTestId('email-login-test'), { target: { value: 'invalidEmail' } });
        fireEvent.input(screen.getByTestId('password-login-test'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Login'));
        
        // Assuming your validation logic displays this message for invalid emails
        await waitFor(() => {
            expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
        });
    });

});