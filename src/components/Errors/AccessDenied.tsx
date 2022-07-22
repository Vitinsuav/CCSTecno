import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { AccessDeniedtheme as theme } from '../../styles/Errors/StyledAcessDenied';

export default function AccessDenied() {
  return (
    <ThemeProvider theme={theme}>
        <Box>
          <h1>403</h1>
          <p>Você não tem permissão para acessar essa página</p>
          <p>Faça Login</p>
        </Box>
    </ThemeProvider>
  );
}