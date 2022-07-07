import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button, Container, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';

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
  

export function Modal(){

    return (
    <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>         
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
    )
}