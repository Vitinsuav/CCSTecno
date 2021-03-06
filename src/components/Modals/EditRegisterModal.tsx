import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import { api } from '../../services/api';
import { FormEvent, useEffect, useState } from 'react';
import { CreateAndEditModalstyle as Modalstyle} from '../../styles/Modals/StyledModal';
interface EditRegisterModalProps {
    isOpen: boolean;
    requestClose: () => void;
    IdOfRegister: {
        IdOfItem: string;
    },
}
interface RetornoDoLancamento {
    aptemp_in_codigo: number,
    apt_dt_data: Date,
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

interface RetornoDasEmpresas {
    aptemp_in_codigo: number,
    aptemp_st_empresa: string, 
}

type ArrayDasEmpresas = Array<RetornoDasEmpresas>

export default function EditRegisterModal({isOpen, requestClose, IdOfRegister} : EditRegisterModalProps){
    
    const Id = IdOfRegister.IdOfItem
    const [ retornoDasEmpresas , setRetornoDasEmpresas ] = useState<ArrayDasEmpresas>([])

    const [InputData, setInputData] = useState('') 
    const [Empresa, setEmpresa] = useState('')
    const [Entrada, setEntrada] = useState('')
    const [Intervalo, setIntervalo] = useState('')
    const [Saida, setSaida] = useState('')
    const [Atividade, setAtividade] = useState('')  
    const [KmRodado, setKmRodado] = useState('')
    const [Pedagio, setPedagio] = useState('')
    const [OrigemDestino, setOrigemDestino] = useState('')
    const [Refeicao, setRefeicao] = useState('')  
    
    function refresh() {
        window.location.reload();
    }

    useEffect(() => {
     api.get('Schedule/Companies').then(response => setRetornoDasEmpresas(response.data)).catch(e => console.log(e))
    }, [])


    let DataSemForma = new Date(InputData)
    const Data = ((DataSemForma.getDate() + 1)) + "/" + ((DataSemForma.getMonth() + 1)) + "/" + DataSemForma.getFullYear(); 

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        Put();
        requestClose();
        refresh();
    }

    function Put () {

        const resposta = api.put(`/Schedule/${Id}`, 
            {
                Data,
                Empresa,
                Entrada,
                Intervalo,
                Saida,
                Atividade,
                KmRodado,
                Pedagio,
                OrigemDestino,
                Refeicao
            })

    }

    const [ retornoDoLancamento, setRetornoDoLancamento ] = useState<RetornoDoLancamento>({} as RetornoDoLancamento)

    console.log(retornoDoLancamento)

    useEffect(() => {
        async function getDados(){
         
        await api.get(`Schedule/${Id}/07_2022`).then(response => setRetornoDoLancamento(response.data)).catch(e => console.log(e))
        setAtividade(retornoDoLancamento.apt_st_atividade);
        setKmRodado(retornoDoLancamento.apt_re_kmrodado);
        setPedagio(retornoDoLancamento.apt_re_pedagio);
        setRefeicao(retornoDoLancamento.apt_st_refeicao);
        setOrigemDestino(retornoDoLancamento.apt_st_origem_destino);
        setEntrada(retornoDoLancamento.apt_st_entrada);
        setIntervalo(retornoDoLancamento.apt_st_intervalo);
        setSaida(retornoDoLancamento.apt_st_saida);
     }
     getDados();
     }, []);


         
    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >                 
        <Box sx={Modalstyle} component="form" onSubmit={handleSubmit}>   
                    
                    <Grid container rowSpacing={4} spacing={2} sx={{pr:5, pl:1, pt:1}}>
                        <Grid item xs={4} >
                            <h1>Editar cadastro</h1>
                        </Grid>
                        <Grid item xs={3}>
                        
                        </Grid>
                        <Grid item xs={3}>
                        
                        </Grid>
                        <Grid item xs={1}>
                        
                        </Grid>
                        <Grid item xs={1} sx={{pt:2}}>
                        <Button onClick={requestClose}><CancelIcon></CancelIcon></Button>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Data"
                                type="date"
                                value={InputData}
                                onChange={e => setInputData(e.target.value)}
                                sx={{width: '100%'}}
                            />
                        </Grid>
                        <Grid item xs={3}>                  
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Cliente"
                                onChange={e => setEmpresa(e.target.value)}
                                sx={{width: '100%'}}
                            >
                            {retornoDasEmpresas.map((empresa) => (      
                            <MenuItem key={empresa.aptemp_in_codigo} value={empresa.aptemp_in_codigo}
                            >
                                {empresa.aptemp_st_empresa}
                            </MenuItem>  
                            ))}                   
                        </TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Entrada"
                            type="time"//tipar depois
                            value={Entrada}
                            onChange={e => setEntrada(e.target.value)}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Intervalo"
                            type="time"//tipar depois
                            value={Intervalo}
                            onChange={e => setIntervalo(e.target.value)}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Sa??da"
                            type="time"//tipar depois
                            value={Saida}
                            onChange={e => setSaida(e.target.value)}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Observa????es deslocamento"
                            multiline
                            maxRows={2}
                            value={OrigemDestino}
                            onChange={e => setOrigemDestino(e.target.value)}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Deslocamento"
                            type="number"//tipar depois
                            value={KmRodado}
                            onChange={e => setKmRodado(e.target.value)}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Ped??gio"
                            type="number"//tipar depois
                            value={Pedagio}
                            onChange={e => setPedagio(e.target.value)}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Refei????o"
                            type="number"//tipar depois
                            value={Refeicao}
                            onChange={e => setRefeicao(e.target.value)}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Descri????o"
                            multiline
                            maxRows={3}
                            sx={{width: '100%'}}
                            value={Atividade}
                            onChange={e => setAtividade(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" sx={{width: '100%', height: 60, color:'secondary.main'}}>
                            Editar                 
                        </Button>
                    </Grid>
                </Grid>
            </Box>         
        </Modal>  
    ) 
}