import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    MemoryRouter: actual.MemoryRouter,
  };
});

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('- Displays an error message', () => {
    const ProblemChild = () => {
      throw new Error('Error problem child');
      return <div></div>;
    };
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(
      <MemoryRouter>
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(getByText(/Something went wrong.../i)).toBeTruthy();
    expect(getByText('Reload')).toBeTruthy();
    spy.mockRestore();
  });
});
