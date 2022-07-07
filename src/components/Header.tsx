import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';

let theme = createTheme({
  palette: {
    primary: {
      light: '#33CC95',
      main: '#0346a2',
      dark: '#1E90FF',
    },
    secundary: {
      light: '#fff',
    }
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pl: 3,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}


export default function Header(onOpenNewTransactionModal: HeaderProps) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <ThemeProvider theme={theme}>
      
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0,}}
      >
        <Toolbar sx={{mt: 1}}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h3" component="h1" sx={{ pl: 5 }}>
                Agendas
              </Typography>
            </Grid>
            <Grid item>
                <Button onClick={handleOpen} variant="contained" sx={{ mr: 1, color: 'secundary.light', backgroundColor: 'primary.dark', borderRadius: '40px' }}>
                Novo Cadastro
                </Button>
                <Modal
                  open={open}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >                 
                <Box sx={style}>   
                  <Button onClick={handleClose}><CancelIcon></CancelIcon></Button>      
                      <Grid container rowSpacing={4} spacing={2} sx={{pr:5, pl:1}}>
                          <Grid item xs={12} >
                                <h1>Cadastrar ação</h1>
                          </Grid>
                          <Grid item xs={3}>
                              <TextField
                                  required
                                  id="outlined-required"
                                  label="Data"
                                  type="date"
                                  sx={{width: '100%'}}
                              />
                          </Grid>
                          <Grid item xs={3}>
                              <TextField
                                  id="outlined-select-currency"
                                  select
                                  label="Cliente"
                                  sx={{width: '100%'}}
                              >
                                
                              <MenuItem value="Arouca">
                                  Arouca
                              </MenuItem>                    
                              </TextField>
                          </Grid>
                          <Grid item xs={2}>
                              <TextField
                                required
                                id="outlined-required"
                                label="Entrada"
                                type="time"//tipar depois
                                sx={{width: '100%'}}
                                />
                          </Grid>
                          <Grid item xs={2}>
                              <TextField
                                required
                                id="outlined-required"
                                label="Intervalo"
                                type="time"//tipar depois
                                sx={{width: '100%'}}
                                />
                          </Grid>
                          <Grid item xs={2}>
                              <TextField
                                required
                                id="outlined-required"
                                label="Saída"
                                type="time"//tipar depois
                                sx={{width: '100%'}}
                                />
                          </Grid>
                          <Grid item xs={6}>
                              <TextField
                                id="outlined-multiline-flexible"
                                label="Observações deslocamento"
                                multiline
                                maxRows={2}
                                sx={{width: '100%'}}
                              />
                          </Grid>
                          <Grid item xs={2}>
                              <TextField
                                required
                                id="outlined-required"
                                label="Deslocamento"
                                type="number"//tipar depois
                                sx={{width: '100%'}}
                                />
                          </Grid>
                          <Grid item xs={2}>
                              <TextField
                                required
                                id="outlined-required"
                                label="Pedágio"
                                type="string"//tipar depois
                                sx={{width: '100%'}}
                                />
                          </Grid>
                          <Grid item xs={2}>
                              <TextField
                                required
                                id="outlined-required"
                                label="Refeição"
                                type="string"//tipar depois
                                sx={{width: '100%'}}
                                />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                id="outlined-multiline-flexible"
                                label="Descrição"
                                multiline
                                maxRows={3}
                                sx={{width: '100%'}}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <Button sx={{width: '100%', height: 60, backgroundColor: 'primary.light', color:'secundary.light'}}>
                                  Cadastrar                  
                              </Button>
                          </Grid>
                      </Grid>
                  </Box>
              </Modal>            
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="Vitor Silva" />
              </IconButton>
            </Grid>    
          </Grid>
        </Toolbar>
      </AppBar>

      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              
            </Grid>
            <Grid item>
            
            
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        
      </AppBar>
    </ThemeProvider>
  );
}