import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper'
import ContextMenu from './ContextMenu';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

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

export default function StickyHeadTable() {

  const [ registros, setRegistros ] = useState([])

  useEffect(() => {
    api.get('Schedule/0/07_2022').then(response => setRegistros(response.data)).catch(e => console.log(e))
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 465 , alignItems: 'center' }}>
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
              <StyledTableCell align="center"></StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
          {registros
          .map((registro) => (
              <StyledTableRow key={registro.aptemp_in_codigo}>
                <StyledTableCell component="th" scope="row" >
                  {registro.apt_dt_data.split("T00:00:00.0000000-03:00")}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 20 }}>{registro.aptemp_st_empresa}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 20 }}>{registro.apt_st_entrada}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 20 }}>{registro.apt_st_intervalo}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 20 }}>{registro.apt_st_saida}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 20 }}>{registro.apt_st_diferenca}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 200}}>{registro.apt_st_atividade}</StyledTableCell>
                <StyledTableCell align="center">{registro.apt_re_kmrodado}</StyledTableCell>
                <StyledTableCell align="center">{registro.apt_re_pedagio}</StyledTableCell>
                <StyledTableCell align="center">{registro.apt_st_origem_destino}</StyledTableCell>
                <StyledTableCell align="center">{registro.apt_st_refeicao}</StyledTableCell>
                <StyledTableCell align="center"><ContextMenu IdOfItem={registro.apt_in_codigo}></ContextMenu></StyledTableCell>           
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
  );
}
