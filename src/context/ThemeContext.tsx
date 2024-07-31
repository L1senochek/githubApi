import React, { createContext, ReactNode, useEffect, useState } from 'react';

export interface IThemeContextState {
  theme: string;
  toggleTheme: () => void;
}

export interface IThemeProviderProps {
  children: ReactNode;
}

const defaultThemeContextState: IThemeContextState = {
  theme: 'dark',
  toggleTheme: () => {},
};

export const ThemeContext = createContext<IThemeContextState>(
  defaultThemeContextState
);

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect((): (() => void) => {
    const rootElement = document.documentElement;
    rootElement.classList.add(theme);

    return (): void => {
      rootElement.classList.remove(theme);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
