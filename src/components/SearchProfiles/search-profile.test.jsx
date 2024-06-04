import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import SearchProfiles from '.';

window.fetch = jest.fn();

const mockProfiles = [
  { id: 1, user: 'user1', url: 'http://example.com/user1.png' },
  { id: 2, user: 'user2', url: 'http://example.com/user2.png' },
];

describe('SearchProfiles Component', () => {
  beforeEach(() => {
    fetch.mockImplementation((url) => {
      if (url.includes('/user/search-profile/')) {
        return Promise.resolve({
          json: () => Promise.resolve({ userInfo: mockProfiles }),
        });
      }
      if (url.includes('/user/follow')) {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true }),
        });
      }
      if (url.includes('/user/user-data')) {
        return Promise.resolve({
          json: () => Promise.resolve({ userData: {} }),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    });
  });

  afterEach(() => {
    fetch.mockClear();
  });

  it('renders SearchProfiles component and fetches profiles', async () => {
    render(
      <MemoryRouter initialEntries={['/search/userquery']}>
        <Routes>
          <Route path="/search/:query" element={<SearchProfiles />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/user/search-profile/userquery',
        expect.any(Object)
      );
    });

    await waitFor(() => {
      mockProfiles.forEach((profile) => {
        expect(screen.getByText(profile.user)).toBeInTheDocument();
      });
    });
  });

  it('handles follow button click', async () => {
    render(
      <MemoryRouter initialEntries={['/search/userquery']}>
        <Routes>
          <Route path="/search/:query" element={<SearchProfiles />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      mockProfiles.forEach((profile) => {
        expect(screen.getByText(profile.user)).toBeInTheDocument();
      });
    });

    const followButtons = screen.getAllByText('Follow');
    fireEvent.click(followButtons[0]);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/user/follow',
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  it('Clicking on the profile redirects to it', async () => {
    render(
      <MemoryRouter initialEntries={['/search/userquery']}>
        <Routes>
          <Route path="/search/:query" element={<SearchProfiles />} />
          <Route path="/profile/2" element={<div>Profile 2 Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      mockProfiles.forEach((profile) => {
        expect(screen.getByText(profile.user)).toBeInTheDocument();
      });
    });

    const userContainer = screen.getByText(/user2/i);
    expect(userContainer).toBeInTheDocument();

    const profileElement = userContainer.parentNode;
    fireEvent.click(profileElement);

    await waitFor(() => {
      expect(screen.getByText('Profile 2 Page')).toBeInTheDocument();
    });
  });
});
