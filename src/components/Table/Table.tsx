import * as React from 'react';
import { Table, TableBody, TableContainer, TableHead, Paper }from '@mui/material';
import ContextMenu from './ContextMenu';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { StyledTableCell, StyledTableRow } from '../../styles/Tables/StyledTable';

interface Data 
  {
    aptemp_in_codigo: number,
    apt_dt_data: string,
    aptemp_st_empresa: string,
    apt_st_entrada: string,
    apt_st_intervalo: string,
    apt_st_saida: string,
    apt_st_diferenca:string,
    apt_st_atividade:string,
    apt_re_kmrodado: string,
    apt_re_pedagio: string,
    apt_st_origem_destino: string,
    apt_st_refeicao: string,
    apt_in_codigo: string,
}

type ArrayDasEmpresas = Array<Data>


export default function RegistersTable() {

  //data atual
  const date = new Date();
  const mesatual = date.getMonth() + 1; 
  const anoatual = date.getFullYear()

  //datas vindas do contexto
  const { mes } = useContext(AuthContext)
  const { ano } = useContext(AuthContext)

  //estado das datas para retorno
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  const [ registros, setRegistros ] = useState<ArrayDasEmpresas>([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    setMonth(mes)
    setYear(ano)
  })

 useEffect(() => {
  async function carregaDados(){
    try{
    await api.get(`Schedule/0/${month}_${year}`).then(response => setRegistros(response.data)).catch(e => console.log(e));
    }catch(e){
      console.log(e);
    }finally{
      setIsloading(false);
    }
  }

  async function carregaDadosPadrao(){
    try{
    await api.get(`Schedule/0/0${mesatual}_${anoatual}`).then(response => setRegistros(response.data)).catch(e => console.log(e));
    }catch(e){
      console.log(e);
    }finally{
      setIsloading(false);
    }
  }

  if(mes!=='' && ano!== ''){
    carregaDados();
     
  }else {
    carregaDadosPadrao();
  }
      
  }, [month]);
  
  return (
   <div>
    {isloading ? <div></div> : 
    <Paper sx={{ width: '110%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 465 , alignItems: 'center' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
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
            </StyledTableRow>
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
                <StyledTableCell align="center" style={{ width: 20 }}>{registro.apt_st_diferenca.slice(6, 8)}</StyledTableCell>
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
          }
    </div>
  );
}
