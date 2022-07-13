import { sendEtagResponse } from 'next/dist/server/send-payload';
import * as React from 'react';
import { useContext, useEffect, useState } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { api } from '../services/api';
//import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"
import { Box, Button, TextField } from '@mui/material';


export default function Dashboard() {
    const { user, isAuthenticated } = useContext(AuthContext)
    
     function Post () {
       const Data = "25-07-2022"
       const Empresa = "3"
       const Entrada = "08:00"
       const Intervalo = "01:00"
       const Saida = "17:30"
       const Atividade = "Implementação 1"
       const KmRodado = "120.5"
       const Pedagio = "200"
       const OrigemDestino = "Atibaia > Campinas"
       const Refeicao = "25.99"

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

    // function Post () {
    //   const Data = "25/07/2022"
    //   const Empresa = "3"
    //   const Entrada = "08:00:00"
    //   const Intervalo = "01:00:00"
    //   const Saida = "17:30:00"
    //   const Atividade = "Implementação 1"
    //   const KmRodado = "120.5"
    //   const Pedagio = "200"
    //   const OrigemDestino = "Atibaia > Campinas"
    //   const Refeicao = "25.99"

    //   const resposta = api.post('/Schedule', 
    //   {
    //     Data,
    //     Empresa,
    //     Entrada,
    //     Intervalo,
    //     Saida,
    //     Atividade,
    //     KmRodado,
    //     Pedagio,
    //     OrigemDestino,
    //     Refeicao
    //   })

    //   console.log(resposta)
    // }

          

    let data = new Date();
    let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 
    console.log(dataFormatada);
      
    

    return(
        <>
          <Button sx={{backgroundColor: "primary.dark"}} onClick={Post}></Button>
            <h1> Dashboard:  </h1>

            <Can permissions={['metrics.list']}>
                <div>Metricas</div> 
            </Can>
            
        </>

    )
}

// export const getServerSideProps = withSSRAuth(async(ctx) => {
//     const apiClient = setupAPIClient(ctx)   
//     const response = await apiClient.get('/me') 
//     console.log(response.data)
   

//     return {
//         props: {

//         }
//     }
// })