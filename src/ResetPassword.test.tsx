import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResetPassword from './pages/ResetPassword';

test('renders Login page without crashing', () => {
    const { baseElement } = render(<ResetPassword />);
    expect(baseElement).toBeDefined();
  });