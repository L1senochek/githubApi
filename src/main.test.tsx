import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { describe, expect, test, vi } from 'vitest';

vi.mock('react-dom/client', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-dom/client');
  return {
    ...actual,
    createRoot: vi.fn().mockReturnValue({
      render: vi.fn(),
    }),
  };
});

describe('Main entry point: ', (): void => {
  test('- Renders App component without crashing.', (): void => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    import('./main');

    const { getByText } = render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    expect(getByText('Search')).toBeTruthy();
  });

  test('- Renders App component.', () => {
    const { getByText } = render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    expect(getByText(/Search/i)).toBeTruthy();
  });
});
