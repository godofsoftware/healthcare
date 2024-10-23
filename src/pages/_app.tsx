import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#8bc34a',
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline to reset default browser styles */}
      <CssBaseline />
      {/* Your entire app will have access to the theme now */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
