import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import CardModal from './CardModal';

const mockedNavigate = vi.fn();

vi.mock('react-router', () => {
  return {
    ...vi.importActual('react-router'),
    useParams: () => ({ userId: 'testuser' }),
    useNavigate: () => mockedNavigate,
    userDetails: {
      login: 'user1',
      avatar_url: 'https://github.com/user1',
      followers: 1,
      following: 2,
      public_repos: 53,
      html_url: 'https://github.com/user1',
    },
  };
});

describe('CardModal: ', (): void => {
  test('- Renders cars details not found', async () => {
    render(<CardModal />);

    const cardImage = screen.getByText(/User details not found/i);
    expect(cardImage).toBeTruthy();
  });

  test('- Closes the modal and navigates correctly when close button is clicked', async () => {
    render(<CardModal />);

    const closeButton = screen.getByText(/close/i);
    closeButton.click();
  });
});
