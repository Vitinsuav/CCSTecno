import * as React from 'react';
import { useContext} from "react"

import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Content from '../components/Header/ContentHeader'
import { AuthContext } from "../contexts/AuthContext"
import AccessDenied from '../components/Errors/AccessDenied';
import { Dashboardtheme as theme } from '../styles/Pages/StyledDashboard';

export default function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext)

  if(isAuthenticated){
    return (
      <ThemeProvider theme={theme}>
        <Box>
          <Content></Content> 
        </Box>
      </ThemeProvider>
    );
  } else{
     return(
        <AccessDenied></AccessDenied>
     )
  }

}


