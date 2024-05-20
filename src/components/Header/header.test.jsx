import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '.';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Elements in header', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(expect.any(Object)),
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const title = screen.getByText(/hello/i);
    const searchBar = screen.getByPlaceholderText(/search/i);
    const image = screen.getByRole('img');

    expect(title).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    await expect(image).toBeInTheDocument();
  });

  it('Search bar navigation', () => {
    const navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);

    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(expect.any(Object)),
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    fireEvent.keyUp(screen.getByPlaceholderText('Search'), {
      keyCode: 13,
      target: { value: 'query' },
    });

    expect(navigate).toHaveBeenCalledWith('/search/query');
  });

  it('Handle fetch error', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    window.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    await screen.findByPlaceholderText(/search/i);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  it('Navigate to main', () => {
    const navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);

    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(expect.any(Object)),
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const title = screen.getByText(/hello/i);
    fireEvent.click(title);

    expect(navigate).toHaveBeenCalledWith('/main');
  });

  it('Clicking profile image appears menu', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(expect.any(Object)),
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const profileImg = screen.getByRole('img');
    fireEvent.click(profileImg);

    expect(await screen.findByText(/profile/i)).toBeInTheDocument();
  });
});
