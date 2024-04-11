import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '.';

describe('Sign up elements test', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  });

  it('All elements exist', () => {
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat Password');
    const submitButton = screen.getByText('Submit');
    const logInButton = screen.getByText('Log In');

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(repeatPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(logInButton).toBeInTheDocument();
  });

  it('Inputs call onChange prop', () => {
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    expect(usernameInput.value).toBe('test');

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password1234' } });
    expect(passwordInput.value).toBe('password1234');

    const repeatPasswordInput = screen.getByPlaceholderText('Repeat Password');
    fireEvent.change(repeatPasswordInput, {
      target: { value: 'password1234' },
    });
    expect(repeatPasswordInput.value).toBe('password1234');
  });
});

describe('Buttons events', () => {
  beforeEach(() =>
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
  );

  it('Correct submit form', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ msg: 'User registered!' }),
    });

    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, { target: { value: 'test' } });

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password1234' } });

    const repeatPasswordInput = screen.getByPlaceholderText('Repeat Password');
    fireEvent.change(repeatPasswordInput, {
      target: { value: 'password1234' },
    });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'test',
        email: 'test@example.com',
        password: 'password1234',
      }),
    });

    expect(window.location.pathname).toBe('/registered');
  });

  it('Handling API error', async () => {
    window.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to fetch'));

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, { target: { value: 'test' } });

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'wrong1234' } });

    const repeatPasswordInput = screen.getByPlaceholderText('Repeat Password');
    fireEvent.change(repeatPasswordInput, {
      target: { value: 'wrong1234' },
    });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'test',
        email: 'wrong@example.com',
        password: 'wrong1234',
      }),
    });

    expect(errorSpy).toHaveBeenCalledWith(new Error('Failed to fetch'));
    errorSpy.mockRestore();
  });

  it('Log In button', () => {
    const logInButton = screen.getByText('Log In');
    fireEvent.click(logInButton);

    expect(window.location.pathname).toBe('/');
  });
});
