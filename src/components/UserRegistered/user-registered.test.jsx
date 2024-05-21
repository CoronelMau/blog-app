import { screen, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import UserRegistered from '.';

describe('User Registered test component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UserRegistered />
      </BrowserRouter>
    );
  });

  it('Loading all components', () => {
    const title = screen.getByText(/user registered!/i);
    const logInButton = screen.getByText(/log in/i);

    expect(title).toBeInTheDocument();
    expect(logInButton).toBeInTheDocument();
  });

  it('Log In button navigation', () => {
    const logInButton = screen.getByText(/log in/i);

    fireEvent.click(logInButton);
    expect(window.location.pathname).toBe('/');
  });
});
