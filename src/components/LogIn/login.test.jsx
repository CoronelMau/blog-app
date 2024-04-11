import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogIn from '.';

describe('Log In page', () => {
  beforeEach(() => {
    render(<LogIn />, { wrapper: BrowserRouter });
  });

  it('Render elements', () => {
    const title = screen.getByRole('heading', { name: 'Log In' });
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const welcomeTitle = screen.getByRole('heading', {
      name: 'Welcome Back Again!',
    });

    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(welcomeTitle).toBeInTheDocument();
  });

  it('Inputs call onChange prop', () => {
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test' } });
    expect(emailInput.value).toBe('test');

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    expect(passwordInput.value).toBe('test');
  });
});

describe('Buttons functions', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );
  });

  test('Correct submit form', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ jwt: expect.any(String) }),
    });

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Log In', { selector: 'button' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/user/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: '123456',
      }),
    });

    expect(window.location.pathname).toBe('/main');
  });

  test('handling API error', async () => {
    window.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to fetch'));

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Log In', { selector: 'button' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/user/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    expect(errorSpy).toHaveBeenCalledWith(new Error('Failed to fetch'));

    errorSpy.mockRestore();
  });

  test('Register form pressed', () => {
    const registerButton = screen.getByText('Create account', {
      selector: 'button',
    });
    fireEvent.click(registerButton);

    expect(window.location.pathname).toBe('/sign-up');
  });
});
