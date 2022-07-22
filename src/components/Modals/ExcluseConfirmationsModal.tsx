import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { api } from '../../services/api';
import { ExcluseModaltheme as theme, ExcluseModalstyle as Modalstyle} from '../../styles/Modals/StyledModal';
interface ExcluseModalProps {
    isOpen: boolean;
    requestClose: () => void,
    IdOfRegister: {
      IdOfItem: string;
  },
}

export default function ExcluseConfirmationsModal({isOpen, requestClose, IdOfRegister} : ExcluseModalProps) {

  const Id = IdOfRegister.IdOfItem;

  function refresh() {
    window.location.reload();
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
        <Box sx={Modalstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Certeza que deseja excluir este cadastro?
          </Typography>
          <Grid sx={{pt: 4}} container spacing={2}>
            <Grid item xs={6}>
              <Button onClick={requestClose} variant="contained" color="primary" sx={{color:'secondary.main', width: '100%'}}>
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="error" sx={{color:'secondary.main', width: '100%'}} onClick={Exclude}>
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