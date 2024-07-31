import { useContext } from 'react';
import { ThemeContext, IThemeContextState } from './ThemeContext';

const useTheme: () => IThemeContextState = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default useTheme;
