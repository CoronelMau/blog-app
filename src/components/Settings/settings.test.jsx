import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Settings from '.';

window.fetch = jest.fn();

const mockFetch = (url) => {
  if (url.includes('/user/update-username')) {
    return Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    });
  }
  if (url.includes('/user/update-pwd')) {
    return Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    });
  }
  if (url.includes('https://api.cloudinary.com/v1_1/dihivxkel/image/upload')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({ secure_url: 'http://example.com/image.jpg' }),
    });
  }
  if (url.includes('/user/update-profile-image')) {
    return Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve({}),
  });
};

describe('Settings Component', () => {
  beforeEach(() => {
    fetch.mockImplementation(mockFetch);
    localStorage.setItem('token', JSON.stringify('mock-token'));
  });

  afterEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  it('renders Settings component correctly', () => {
    render(
      <BrowserRouter>
        <Settings />
      </BrowserRouter>
    );

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Change Username')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /change password/i }));
    expect(screen.getByText('Change Profile Picture')).toBeInTheDocument();
  });

  it('updates username', async () => {
    render(
      <BrowserRouter>
        <Settings />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'new-username' },
    });
    fireEvent.click(screen.getByText('Change Name'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/user/update-username',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ username: 'new-username' }),
        })
      );
    });
  });

  it('updates password', async () => {
    render(
      <BrowserRouter>
        <Settings />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Current Password'), {
      target: { value: 'old-password' },
    });
    fireEvent.change(screen.getByPlaceholderText('New Password'), {
      target: { value: 'new-password' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat Password'), {
      target: { value: 'new-password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /change password/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/user/update-pwd',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({
            oldPwd: 'old-password',
            newPwd: 'new-password',
          }),
        })
      );
    });
  });

  it('updates profile image', async () => {
    render(
      <BrowserRouter>
        <Settings />
      </BrowserRouter>
    );

    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    fireEvent.change(
      screen.getByText('Change Profile Picture').nextElementSibling,
      {
        target: { files: [file] },
      }
    );
    fireEvent.click(
      screen.getByRole('button', { name: /change profile image/i })
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://api.cloudinary.com/v1_1/dihivxkel/image/upload',
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/user/update-profile-image',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ url: 'http://example.com/image.jpg' }),
        })
      );
    });
  });
});
