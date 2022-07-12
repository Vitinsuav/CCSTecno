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
}


export default function EditRegisterModal({isOpen, requestClose} : EditRegisterModalProps){
    
    const [ response, setResponse ] = useState([])

    useEffect(() => {
     api.get('Schedule/Companies').then(response => setResponse(response.data)).catch(e => console.log(e))
    }, [])

  
    const empresas = response

return (
    <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >                 
        <Box sx={Modalstyle}>      
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
                    <Grid item xs={1}>
                        <Button onClick={requestClose}><CancelIcon></CancelIcon></Button>   
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
                                
                        {empresas.map((empresa) => (         
                        <MenuItem value={empresa.aptemp_st_empresa}>
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
) 
}