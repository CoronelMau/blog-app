import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App, { AppRoutes } from './App';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Testing App component', () => {
  afterEach(() => {
    localStorage.clear;
  });
  it('Testing Protected Route function. Redirecting to / if when token does not exist', () => {
    localStorage.removeItem('token');

    render(
      <MemoryRouter initialEntries={['/main']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const logInTitle = screen.getByRole('heading', { name: /log in/i });
    expect(window.location.pathname).toBe('/');
    expect(logInTitle).toBeInTheDocument();
  });

  it('Testing Protected Route funciton. Returning children when token exists', () => {
    localStorage.setItem('token', 'mock-token');

    render(
      <MemoryRouter initialEntries={['/main']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(window.location.pathname).not.toBe('/');
  });
  it('Rendering app component', () => {
    render(<App />);
  });
});
