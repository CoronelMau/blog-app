import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Profile from '.';
import store from '../../redux/store';

const mockUser = {
  username: 'testuser',
  url: 'http://example.com/testuser.jpg',
  followersCount: 100,
  followingCount: 50,
};

const mockPosts = {
  posts: [
    { id: 1, content: 'Post 1' },
    { id: 2, content: 'Post 2' },
  ],
};

window.fetch = jest.fn();
window.setImmediate = (fn) => setTimeout(fn, 0);

describe('Profile component test', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockImplementation((url) => {
      if (url.includes('profile')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockUser),
        });
      }
      if (url.includes('posts')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPosts),
        });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.only('renders profile page with user data and posts', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/profile/1']}>
          <Routes>
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockUser.username)).toBeInTheDocument();
      expect(
        screen.getByText(`${mockUser.followersCount} Followers`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`${mockUser.followingCount} Followings`)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('Post 2')).toBeInTheDocument();
    });
  });
});
