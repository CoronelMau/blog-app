import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Menu from '.';

describe('Menu component tests', () => {
  it('Rendering elements', () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );

    const profileOption = screen.getByText(/profile/i);
    const settingsOption = screen.getByText(/settings/i);
    const closeSessionOption = screen.getByText(/close session/i);

    expect(profileOption).toBeInTheDocument();
    expect(settingsOption).toBeInTheDocument();
    expect(closeSessionOption).toBeInTheDocument();
  });

  it('Navigate to profile when Profile option is clicked', () => {
    const userId = 'test';

    render(
      <BrowserRouter>
        <Menu userId={userId} />
      </BrowserRouter>
    );

    const profileOption = screen.getByText(/profile/i);
    fireEvent.click(profileOption);

    expect(window.location.pathname).toBe(`/profile/${userId}`);
  });

  it('Navigate to settings when Settings option is clicked', () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );

    const settingsOption = screen.getByText(/settings/i);
    fireEvent.click(settingsOption);

    expect(window.location.pathname).toBe('/settings');
  });

  it('Removing token in local storage and navigating to /, when close session option is clicked', () => {
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

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    localStorage.setItem('token', 'sampleToken');

    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );

    const closeSessionOption = screen.getByText(/close session/i);
    fireEvent.click(closeSessionOption);

    expect(localStorage.getItem('token')).toBeNull();
    expect(window.location.pathname).toBe('/');
  });
});
