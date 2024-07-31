import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import { describe, expect, test } from 'vitest';

describe('SearchResults: ', (): void => {
  test('- Displays the card name', (): void => {
    const mockSearchResults = [
      {
        id: '1',
        login: 'user1',
        avatar_url: 'avatar1.jpg',
        html_url: 'https://github.com/user1',
      },
      {
        id: '2',
        login: 'user2',
        avatar_url: 'avatar2.jpg',
        html_url: 'https://github.com/user2',
      },
    ];

    render(
      <SearchResults
        searchResults={mockSearchResults}
        onItemClick={(): void => {}}
      />
    );

    const cards = screen.getByText('user1');
    expect(cards).toBeTruthy();
  });

  test('- Displays appropriate message if no cards are present', () => {
    render(<SearchResults searchResults={[]} onItemClick={() => {}} />);

    const noResultsMessage = screen.getByText(/no results found/i);
    expect(noResultsMessage).toBeTruthy();
  });
});
