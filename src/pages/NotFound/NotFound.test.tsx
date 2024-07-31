import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import { describe, expect, test } from 'vitest';

describe('NotFound:', () => {
  test('- Renders "Page not found" message correctly', () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <Routes>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const notFoundTitle = screen.getByText(/Page not found!/i);
    expect(notFoundTitle).toBeTruthy();

    const notFoundMessage = screen.getByText(/404/i);
    expect(notFoundMessage).toBeTruthy();
  });

  test('- Renders link to home page', () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <Routes>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeTruthy();
    expect(homeLink.getAttribute('href')).toBe('/');
  });
});
