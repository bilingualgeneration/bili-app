import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

test('renders Login page without crashing', () => {
    const { baseElement } = render(<Login />);
    expect(baseElement).toBeDefined();
  });

//interaction tests
