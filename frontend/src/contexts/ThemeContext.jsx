import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {getDesignTokens} from '@/theme'; 


export const ThemeContext = createContext();

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") || "light"
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  React.useEffect(() => {
    localStorage.setItem("currentMode", mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
