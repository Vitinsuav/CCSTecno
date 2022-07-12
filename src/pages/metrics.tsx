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
      const Data = "25/07/2022"
      const Empresa = "3"
      const Entrada = "08:00:00"
      const Intervalo = "01:00:00"
      const Saida = "17:30:00"
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
    }

      function PostPost(){

        const Data1 = "30/07/2022"
        const Empresa1 = "3"
        const Entrada1 = "08:00:00"
        const Intervalo1 = "01:00:00"
        const Saida1 = "17:30:00"
        const Atividade1 = "Implementação 1"
        const KmRodado1 = "120.5"
        const Pedagio1 = "200"
        const OrigemDestino1 = "Atibaia > Mairipora"
        const Refeicao1 = "25.99"
            
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
    
      
    

    return(
        <>
          <Button sx={{backgroundColor: "primary.dark"}} onClick={PostPost}></Button>
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