import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    background: '#000000',
    text: '#ffffff',
    primary: '#ffffff',
    secondary: '#333333',
    border: '#444444',
    card: '#1a1a1a',
    button: '#333333',
    buttonText: '#ffffff',
    header: '#1a1a1a',
    gridHeader: '#333333',
    gridRow: '#1a1a1a',
    gridBorder: '#444444',
  },
  light: {
    background: '#ffffff',
    text: '#000000',
    primary: '#000000',
    secondary: '#f5f5f5',
    border: '#e0e0e0',
    card: '#ffffff',
    button: '#f5f5f5',
    buttonText: '#000000',
    header: '#f5f5f5',
    gridHeader: '#e0e0e0',
    gridRow: '#ffffff',
    gridBorder: '#e0e0e0',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 