import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { api } from '../../services/api';

let theme = createTheme({
  palette: {
    primary: {
      light: '#e9380c',
      main: '#ddbf13',
      dark: '#1E90FF',
    },
    secundary: {
      light: '#fff',
    }
  }})

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
};

interface CreateRegisterModalProps {
    isOpen: boolean;
    requestClose: () => void,
    IdOfRegister: string;
}


export default function ExcluseConfirmationsModal({isOpen, requestClose, IdOfRegister} : CreateRegisterModalProps) {

  const Id = IdOfRegister.IdOfItem

  function refresh() {
    window.location.reload(false);
  }
  
  function Exclude() { 
    const resposta = api.delete(`Schedule/${Id}`)
    console.log(resposta)
    requestClose()
    refresh()
  }

  return (
    <ThemeProvider theme={theme}>
    <div>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Certeza que deseja excluir este cadastro?
          </Typography>
          <Grid sx={{pt: 4}} container spacing={2}>
            <Grid item xs={6}>
              <Button onClick={requestClose} sx={{backgroundColor: 'primary.main', color:'secundary.light', width: '100%'}}>
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button sx={{backgroundColor: 'primary.light', color:'secundary.light', width: '100%'}} onClick={Exclude}>
                Excluir
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
    </ThemeProvider>
  );
}