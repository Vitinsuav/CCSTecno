import * as React from 'react';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Toolbar, List, Typography, Divider, IconButton, Grid, Button, Avatar } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';

import { mainListItems } from './ListItems';
import RegistersTable from '../Table/Table';
import CreateRegisterModal from '../Modals/CreateRegisterModal';
import InputMonthModal from '../Modals/InputMonthOfRegistersModal';
import { AppBar, Drawer, theme } from '../../styles/Header/StyledComponents'

function DashboardContent() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [createRegisterModalOpen, setCreateRegisterModalOpen] = useState(false);
  const handleOpenRegisterModal = () => setCreateRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setCreateRegisterModalOpen(false);

  const [InputMonthModalOpen, setInputMonthModalOpen] = useState(false);
  const handleOpenInputMonthModal = () => setInputMonthModalOpen(true);
  const handleCloseInputMonthModal = () => setInputMonthModalOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Agendas
            </Typography>
            <Button onClick={handleOpenRegisterModal} variant="contained" sx={{ mr: 1, color: 'secondary.main', backgroundColor: 'primary.light', borderRadius: '40px' }}>
                <AddIcon/> Novo cadastro
            </Button>
            <CreateRegisterModal isOpen={createRegisterModalOpen} requestClose={handleCloseRegisterModal}></CreateRegisterModal>
            <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="Vitor Silva" />
              </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        > 
          <Toolbar />
       
          <Grid container>
            <Grid item>
              <Button onClick={handleOpenInputMonthModal} variant="contained" color="primary" sx={{ color: 'secondary.main' ,marginLeft:'20px', marginTop: '30px'}}> 
              Mês dos agendamentos 
              <InputMonthModal isOpen={InputMonthModalOpen} requestClose={handleCloseInputMonthModal}></InputMonthModal>
              </Button>
            </Grid>
          </Grid>
            <Grid style={{marginTop: '15px', marginLeft:'20px', width:'87%'  }} container spacing={0}>
              <Grid item xs={12}>           
                <RegistersTable></RegistersTable>              
              </Grid>
            </Grid>
      
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Content() {
  return <DashboardContent />;
}