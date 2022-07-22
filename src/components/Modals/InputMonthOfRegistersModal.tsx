import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { InputMonthModaltheme as theme, InputModalstyle as Modalstyle} from '../../styles/Modals/StyledModal'

interface CreateRegisterModalProps {
    isOpen: boolean;
    requestClose: () => void,
}

export default function InputMonthModal({isOpen, requestClose} : CreateRegisterModalProps) {

  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('')

  const { Datar } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    Datar({mes: mes, ano: ano})
      requestClose()
  }
    
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Modal
          open={isOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={Modalstyle} component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}> 
          <Grid item xs={11}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Período desejado dos agendamentos: 
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{pb:5}}>
              <Button onClick={requestClose}><CancelIcon></CancelIcon></Button>
          </Grid>
          </Grid>
            <Grid sx={{pt: 1}} container spacing={2}>
              <Grid item xs={6}>
              <TextField
              id="outlined-select-currency"
              select
              label="Mês"
              helperText="Selecione um mês"
              sx={{width:250}}
              onChange={e => setMes(e.target.value)}
              >
                  <MenuItem key="01" value="01">
                      Janeiro
                  </MenuItem>
                  <MenuItem key="02" value="02">
                      Fevereiro
                  </MenuItem>
                  <MenuItem key="03" value="03">
                      Março
                  </MenuItem>
                  <MenuItem key="04" value="04">
                      Abril
                  </MenuItem>
                  <MenuItem key="05" value="05">
                      Maio
                  </MenuItem>
                  <MenuItem key="06" value="06">
                      Junho
                  </MenuItem>
                  <MenuItem key="07" value="07">
                      Julho
                  </MenuItem>
                  <MenuItem key="08" value="08">
                      Agosto
                  </MenuItem>
                  <MenuItem key="09" value="09">
                      Setembro
                  </MenuItem>
                  <MenuItem key="10" value="10">
                      Outubro
                  </MenuItem>
                  <MenuItem key="11" value="11">
                      Novembro
                  </MenuItem>
                  <MenuItem key="12" value="12">
                      Dezembro
                  </MenuItem>
              </TextField>
              </Grid>
              <Grid item xs={6}>
              <TextField
              id="outlined-select-currency"
              select
              label="Ano"
              helperText="Selecione um ano"
              onChange={e => setAno(e.target.value)}
              sx={{width:250}}
              >
                  <MenuItem key="01" value="2021">
                      2021
                  </MenuItem>
                  <MenuItem key="02" value="2022">
                      2022
                  </MenuItem>
              </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{pt: 2}}>
                  <Button type="submit" variant="contained" color="primary" sx={{width: '100%', height: 60, backgroundColor: 'primary.dark', color:'secondary.main'}}>
                      Procurar Registros                
                  </Button>
              </Grid>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
