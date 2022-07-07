import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Box, Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { withSSRAuth } from '../utils/withSSRAuth';
import { setupAPIClient } from "../services/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    
  }));

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

interface Data {
    name: string,
    data: string,
    entrada: string,
    intervalo: string,
    saida: string,
    total: string,
    deslocamento: number,
    pedagio: string,
    obs: string,
    refeicao: string,
}

function createData(
  name: string,
  data: string,
  entrada: string,
  intervalo: string,
  saida: string,
  total: string,
  deslocamento: number,
  pedagio: string,
  obs: string,
  refeicao: string,
): Data {
  return { name, data, entrada, intervalo, saida, total, deslocamento, pedagio, obs, refeicao };
}

const rows = [
    createData('Arouca', '23/06/2022', '08:30', '01:00', '16:30', '07:00', 100, '4,80', 'Atibaia > Campinas','25,00'),
    createData('Lux', '24/06/2022', '09:00', '01:00', '12:30','07:00', 100,'4,80','Atibaia > Campinas','25,00'),
    createData('KR', '25/06/2022', '8:00', '01:00', '17:45','07:00',100,'4,80','Atibaia > Campinas','25,00'),
    createData('Ática', '26/06/2022', '07:55', '01:00', '17:30','07:00', 100,'4,80','Atibaia > Campinas','25,00'),
    createData('TecnoLock', '27/06/2022', '08:30', '01:00', '15:30','07:00', 100,'4,80','Atibaia > Campinas', '25,00'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 470 , alignItems: 'center' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Data</StyledTableCell>
              <StyledTableCell align="center">Cliente</StyledTableCell>
              <StyledTableCell align="center">Entrada</StyledTableCell>
              <StyledTableCell align="center">Intervalo</StyledTableCell>
              <StyledTableCell align="center">Saída</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
              <StyledTableCell align="center">Descrição</StyledTableCell>
              <StyledTableCell align="center">Deslocamento(KM)</StyledTableCell>
              <StyledTableCell align="center">Pedágio</StyledTableCell>
              <StyledTableCell align="center">Observações Deslocamento</StyledTableCell>
              <StyledTableCell align="center">Refeição</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.data}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 20 }}>{row.name}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 20 }}>{row.entrada}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 20 }}>{row.intervalo}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 20 }}>{row.saida}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 20 }}>{row.total}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 200}}>Implantação 1 <br></br>Implantação 2<br></br>Implantação 3</StyledTableCell>
                <StyledTableCell align="center">{row.deslocamento}</StyledTableCell>
                <StyledTableCell align="center">{row.pedagio}</StyledTableCell>
                <StyledTableCell align="center">{row.obs}</StyledTableCell>
                <StyledTableCell align="center">{row.refeicao}</StyledTableCell>
                <StyledTableCell align="center"><Button onClick={handleOpen}>
                <Modal
                  open={open}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>         
                      <Grid container rowSpacing={4} spacing={2} sx={{pr:5, pl:1}}>
                        
                          <Grid item xs={12} >
                                <h1>Editar cadastro</h1>
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
                                  Editar                  
                              </Button>
                          </Grid>
                      </Grid>
                  </Box>
              </Modal>           
              <EditIcon></EditIcon></Button></StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export const getServerSideProps = withSSRAuth(async(ctx) => {
    const apiClient = setupAPIClient(ctx)   
    const response = await apiClient.get('/me') 

    return {
        props: {

        }
    }
}, {
    permissions: ['metrics.list'],
    roles: ['administrator']
})