import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import { api } from '../../services/api';
import { useEffect, useState, FormEvent } from 'react';

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

interface CreateRegisterModalProps {
    isOpen: boolean;
    requestClose: () => void,
}


export default function CreateRegisterModal({isOpen, requestClose} : CreateRegisterModalProps){
    const [Data, setData] = useState()
    const [Empresa, setEmpresa] = useState()
    const [Entrada, setEntrada] = useState()
    const [Intervalo, setIntervalo] = useState()
    const [Saida, setSaida] = useState()
    const [Atividade, setAtividade] = useState()  
    const [KmRodado, setKmRodado] = useState()
    const [Pedagio, setPedagio] = useState()
    const [OrigemDestino, setOrigemDestino] = useState()
    const [Refeicao, setRefeicao] = useState()
    
    const [ response, setResponse ] = useState([])

      useEffect(() => {
       api.get('Schedule/Companies').then(response => setResponse(response.data)).catch(e => console.log(e))
      }, [])

    
    const empresas = response

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        Post();

    }

    function Post () {
         
        //Com os dados do form/não funciona

        const resposta = api.post('/Schedule', 
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
      
        console.log(resposta)
    }
  
    //Com os dados digitados/nao funciona tbm

    function Post1(){

    const Data1 = "30/07/2022"
    const Empresa1 = 3
    const Entrada1 = "08:00:00"
    const Intervalo1 = "01:00:00"
    const Saida1 = "17:30:00"
    const Atividade1 = "Implementação 1"
    const KmRodado1 = 120.5
    const Pedagio1 = 200
    const OrigemDestino1 = "Atibaia > Mairipora"
    const Refeicao1 = 25.99
        
    const resposta1 = api.post('/Schedule', 
        {
        Data1,
        Empresa1,
        Entrada1,
        Intervalo1,
        Saida1,
        Atividade1,
        KmRodado1,
        Pedagio1,
        OrigemDestino1,
        Refeicao1
        })
          
          
        console.log(resposta1)
    }

          


    
return (
    <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >                 
        <Box sx={Modalstyle} component="form">   
                  
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
                            value={Data}
                            onChange={e => setData(e.target.value)}
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
                       {empresas.map((empresa) => (         
                        <MenuItem value="1"
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
                    <Button type="submit" sx={{width: '100%', height: 60, backgroundColor: 'success.main', color:'secundary.light'}} onClick={Post1}>
                        Cadastrar                  
                    </Button>
                </Grid>
            </Grid>
        </Box>         
    </Modal>  
) 
}