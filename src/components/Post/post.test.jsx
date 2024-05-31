import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Posts from '.';

window.setImmediate = (fn) => setTimeout(fn, 0);

const mockSendData = [
  {
    id: '1',
    user: 'User1',
    content: 'Post content 1',
    url: 'https://example.com/image1.jpg',
    likes: 10,
    comments: [{ id: 'c1', user: 'Commenter1', content: 'Comment 1' }],
  },
];

describe('Post component', () => {
  it('Testing all the elements are in the document', () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(expect.any(Object)),
    });

    render(
      <BrowserRouter>
        <Posts sendData={mockSendData} />
      </BrowserRouter>
    );

    const postText = screen.getByText(/post content 1/i);
    const postLikes = screen.getByText(/10 likes/i);
    const postComment = screen.getByText(/comment 1/i);

    expect(postText).toBeInTheDocument();
    expect(postLikes).toBeInTheDocument();
    expect(postComment).toBeInTheDocument();
  });

  it('Testing likes count when like button is clicked', () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(expect.any(Object)),
    });

    render(
      <BrowserRouter>
        <Posts sendData={mockSendData} />
      </BrowserRouter>
    );

    const postLikes = screen.getByText(/10 likes/i);
    fireEvent.click(postLikes);

    const newPostLikes = screen.getByText(/11 likes/i);
    expect(newPostLikes).toBeInTheDocument();
  });

  it('Testing when a new comment is added', () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(expect.any(Object)),
    });

    render(
      <BrowserRouter>
        <Posts sendData={mockSendData} />
      </BrowserRouter>
    );

    const commentInput = screen.getByPlaceholderText(/comment/i);
    fireEvent.change(commentInput, { target: { value: 'new comment' } });

    fireEvent.keyDown(commentInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    const newComment = screen.getByText(/new comment/i);
    expect(newComment).toBeInTheDocument();
  });
});
