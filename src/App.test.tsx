import { describe, expect, it, test } from 'vitest';
import { ReactElement } from 'react';
import { act, render } from '@testing-library/react';
import App from './App';

describe('App: ', (): void => {
  it('Renders headline.', async () => {
    await act(async (): Promise<void> => {
      render(<App />);
      await Promise.resolve();
    });
  });
  it('Renders TodoApp component.', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Items per page/i)).toBeTruthy();
  });
});

test('adds 1 + 2 to equal 3', () => {
  const a = 1;
  const b = 2;
  expect(a + b).toBe(3);
});

it('Testing ReactElement', () => {
  const App = (): ReactElement => {
    return <h1>Test h1</h1>;
  };
  expect(<App />).not.toBeNull();
});
