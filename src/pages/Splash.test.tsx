import React from 'react';
import { render, screen } from '@testing-library/react';
import Splash from './Splash';

describe('<Splash />', () => {
  it('should render the title', () => {
    render(<Splash />);
    const titleElement = screen.getByText('Welcome to Bili');
    expect(titleElement).toBeVisible();
  });

  it('should render the Sign Up button', () => {
    render(<Splash />);
    const signUpButton = screen.getByText('Sign Up');
    expect(signUpButton).toBeVisible();
  });


  // Uncomment when the Sign In button enabled:
  // it('should render the Sign In button', () => {
  //   render(<Splash />);
  //   const signInButton = screen.getByText('Sign In');
  //   expect(signInButton).toBeVisible();
  // });
});