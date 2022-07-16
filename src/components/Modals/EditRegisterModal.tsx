import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';

const Modalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 875,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pl: 3,
};

interface EditRegisterModalProps {
    isOpen: boolean;
    requestClose: () => void,
    IdOfRegister: string;
}


export default function EditRegisterModal({isOpen, requestClose, IdOfRegister} : EditRegisterModalProps){
    
    const Id = IdOfRegister.IdOfItem
    const [ retornoDasEmpresas , setRetornoDasEmpresas ] = useState([])

    const [InputData, setInputData] = useState(new Date()) 
    const [Empresa, setEmpresa] = useState()
    const [Entrada, setEntrada] = useState()
    const [Intervalo, setIntervalo] = useState()
    const [Saida, setSaida] = useState()
    const [Atividade, setAtividade] = useState()  
    const [KmRodado, setKmRodado] = useState()
    const [Pedagio, setPedagio] = useState()
    const [OrigemDestino, setOrigemDestino] = useState()
    const [Refeicao, setRefeicao] = useState()  
    
    function refresh() {
        window.location.reload(false);
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

    const [ retornoDoLancamento, setRetornoDoLancamento ] = useState([])
    
    // useEffect(()=> {
    //     loadData()
    // }, [])

    // async function loadData(){
    //     const chamada = await api.get(`Schedule/${Id}/07_2022`)
    //     console.log(chamada.data)
       
    // }
     const recuperaDados = async() => {
        
     const response = await api.get(`Schedule/${Id}/07_2022`).then(response => setRetornoDoLancamento(response.data)).catch(e => console.log(e))
    }

    recuperaDados()

    useEffect(() => {
        setAtividade(retornoDoLancamento.apt_st_atividade)
        setKmRodado(retornoDoLancamento.apt_re_kmrodado)
        setPedagio(retornoDoLancamento.apt_re_pedagio)
        setRefeicao(retornoDoLancamento.apt_st_refeicao)
        setOrigemDestino(retornoDoLancamento.apt_st_origem_destino)
        setEntrada(retornoDoLancamento.apt_st_entrada)
        setIntervalo(retornoDoLancamento.apt_st_intervalo)
        setSaida(retornoDoLancamento.apt_st_saida)
    }, [])

    console.log(retornoDoLancamento)
         
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
                            <MenuItem value={empresa.aptemp_in_codigo}
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
                            label="Saída"
                            type="time"//tipar depois
                            value={Saida}
                            onChange={e => setSaida(e.target.value)}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Observações deslocamento"
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
                            label="Pedágio"
                            type="string"//tipar depois
                            value={Pedagio}
                            onChange={e => setPedagio(e.target.value)}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Refeição"
                            type="string"//tipar depois
                            value={Refeicao}
                            onChange={e => setRefeicao(e.target.value)}
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
                            value={Atividade}
                            onChange={e => setAtividade(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" sx={{width: '100%', height: 60, backgroundColor: 'success.main', color:'secundary.light'}}>
                            Editar                 
                        </Button>
                    </Grid>
                </Grid>
            </Box>         
        </Modal>  
    ) 
}