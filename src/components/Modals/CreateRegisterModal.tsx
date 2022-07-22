import * as React from 'react';
import { useEffect, useState, FormEvent } from 'react';
import { Box, Button, TextField, MenuItem, Modal, Grid } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { api } from '../../services/api';
import { CreateAndEditModalstyle as Modalstyle} from '../../styles/Modals/StyledModal';
interface CreateRegisterModalProps {
    isOpen: boolean;
    requestClose: () => void,
}
interface RetornoDasEmpresas{
    aptemp_in_codigo: number,
    aptemp_st_empresa: string, 

}

type ArrayDasEmpresas = Array<RetornoDasEmpresas>


export default function CreateRegisterModal({isOpen, requestClose} : CreateRegisterModalProps){
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
    
    const [ retornoDasEmpresas, setRetornoDasEmpresas ] = useState<ArrayDasEmpresas>([])

    function refresh() {
        window.location.reload();
    }

    useEffect(() => {
       api.get('Schedule/Companies').then(response => setRetornoDasEmpresas(response.data)).catch(e => console.log(e))
    }, [])

    let DataSemForma = new Date(InputData)
    const Data = ((DataSemForma.getDate() + 1)) + "/" + ((DataSemForma.getMonth() + 1)) + "/" + DataSemForma.getFullYear(); 

    function Post () {

        api.post('/Schedule', 
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

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        Post();
        requestClose()
        refresh()
    }

    
return (
    <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >                 
        <Box sx={Modalstyle} component="form" onSubmit={handleSubmit}>   
                  
                <Grid container rowSpacing={4} spacing={2} sx={{pr:5, pl:1, pt:1}}>
                    <Grid item xs={4} >
                        <h1>Cadastrar ação</h1>
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
                       {retornoDasEmpresas.map((empresa : RetornoDasEmpresas) => (         
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
                        label="Refeição"
                        type="number"//tipar depois
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
                    <Button type="submit" color="success" variant="contained" sx={{width: '100%', height: 60, color:'secondary.main'}}>
                        Cadastrar                  
                    </Button>
                </Grid>
            </Grid>
        </Box>         
    </Modal>  
) 
}