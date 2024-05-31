import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PostModal from '.';

const closeModalMock = jest.fn();
const updatePostsMock = jest.fn();

window.setImmediate = (fn) => setTimeout(fn, 0);

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

window.localStorage = localStorageMock;

window.fetch = jest.fn();

describe('Post Modal tests', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('dummyToken'));

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ finalPosts: [] }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('rendering elements', () => {
    render(
      <BrowserRouter>
        <PostModal />
      </BrowserRouter>
    );

    const modalTitle = screen.getByRole('heading', { name: 'New Post' });
    const inputModal = screen.getByPlaceholderText(/new post/i);
    const imageLabel = screen.getByText(/image:/i);
    const fileInput = imageLabel.nextElementSibling;

    expect(modalTitle).toBeInTheDocument();
    expect(inputModal).toBeInTheDocument();
    expect(imageLabel).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
  });

  it('Close modal when press X', () => {
    render(
      <BrowserRouter>
        <PostModal closeModal={closeModalMock} updatePosts={updatePostsMock} />
      </BrowserRouter>
    );

    const closeButton = screen.getByText(/x/i);
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(closeModalMock).toHaveBeenCalledWith(false);
    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });

  it('updates posts correctly when a new post is added', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ secure_url: 'http://example.com/image.jpg' }),
      })
    );

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            postData: {
              id: 1,
              text: 'new post content',
              url: 'http://example.com/image.jpg',
            },
          }),
      })
    );

    render(
      <BrowserRouter>
        <PostModal closeModal={closeModalMock} updatePosts={updatePostsMock} />
      </BrowserRouter>
    );

    const newPostContent = 'new post content';

    const postContentInput = screen.getByPlaceholderText('New Post');
    expect(postContentInput).toBeInTheDocument();
    fireEvent.change(postContentInput, { target: { value: newPostContent } });

    const file = new File(['image content'], 'image.jpg', {
      type: 'image/jpeg',
    });

    const imageLabel = screen.getByText(/image:/i);
    const fileInput = imageLabel.nextElementSibling;
    fireEvent.change(fileInput, { target: { files: [file] } });

    const updatePostButton = screen.getByText(/add post/i, {
      selector: 'button',
    });

    fireEvent.click(updatePostButton);

    await waitFor(() => {
      const jwt = JSON.parse(localStorage.getItem('token'));

      expect(fetch).toHaveBeenCalledWith(
        'https://api.cloudinary.com/v1_1/dihivxkel/image/upload',
        expect.any(Object)
      );
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/user/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          text: 'new post content',
          url: 'http://example.com/image.jpg',
        }),
      });
    });
  });

  it('handles post submission without an image correctly', async () => {
    render(
      <BrowserRouter>
        <PostModal closeModal={closeModalMock} updatePosts={updatePostsMock} />
      </BrowserRouter>
    );

    const newPostContent = 'new post content';

    const postContentInput = screen.getByPlaceholderText('New Post');
    expect(postContentInput).toBeInTheDocument();
    fireEvent.change(postContentInput, { target: { value: newPostContent } });

    const updatePostButton = screen.getByText(/add post/i, {
      selector: 'button',
    });

    fireEvent.click(updatePostButton);

    const jwt = localStorage.getItem('token');

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/user/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        text: 'new post content',
        url: null,
      }),
    });
  });
});
