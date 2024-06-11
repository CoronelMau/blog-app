import { Provider } from 'react-redux';

import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '.';
import store from '../../redux/store';

window.setImmediate = (fn) => setTimeout(fn, 0);

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

window.localStorage = localStorageMock;

window.fetch = jest.fn();

describe('MainPage component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('dummyToken'));

    window.fetch.mockImplementation((url) => {
      if (url === 'https://api.cloudinary.com/v1_1/dihivxkel/image/upload') {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ secure_url: 'http://example.com/image.jpg' }),
        });
      }

      if (url === 'http://localhost:8000/user/post') {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              postData: {
                text: 'new post content',
                url: 'http://example.com/image.jpg',
              },
            }),
        });
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ finalPosts: [] }),
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders Header and PostingInput correctly', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <MainPage />
          </BrowserRouter>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    expect(
      screen.getByPlaceholderText('Write your thoughts')
    ).toBeInTheDocument();
  });

  it('shows modal when the post input is pressed', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <MainPage />
          </BrowserRouter>
        </Provider>
      );
    });

    const postInput = screen.getByPlaceholderText(/write your thoughts/i);
    fireEvent.click(postInput);

    const modalTitle = screen.getByRole('heading', { name: 'New Post' });
    expect(modalTitle).toBeInTheDocument();
  });

  it('updates posts correctly when a new post is added', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <MainPage />
          </BrowserRouter>
        </Provider>
      );
    });

    fireEvent.click(screen.getByPlaceholderText(/write your thoughts/i));

    const newPostContent = 'new post content';

    const postContentInput = screen.getByPlaceholderText('New Post');
    expect(postContentInput).toBeInTheDocument();
    fireEvent.change(postContentInput, { target: { value: newPostContent } });

    const updatePostButton = screen.getByText(/add post/i, {
      selector: 'button',
    });

    fireEvent.click(updatePostButton);

    await waitFor(() => {
      expect(screen.getByText(newPostContent)).toBeInTheDocument();
    });
  });

  it('handles post submission without an image correctly', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <MainPage />
          </BrowserRouter>
        </Provider>
      );
    });

    fireEvent.click(screen.getByPlaceholderText(/write your thoughts/i));

    const newPostContent = 'new post content';

    const postContentInput = screen.getByPlaceholderText('New Post');
    expect(postContentInput).toBeInTheDocument();
    fireEvent.change(postContentInput, { target: { value: newPostContent } });

    const updatePostButton = screen.getByText(/add post/i, {
      selector: 'button',
    });

    fireEvent.click(updatePostButton);

    await waitFor(() => {
      expect(screen.getByText(newPostContent)).toBeInTheDocument();
    });
  });
});
