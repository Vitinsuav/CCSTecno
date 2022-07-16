import { sendEtagResponse } from 'next/dist/server/send-payload';
import * as React from 'react';
import { useContext, useEffect, useState } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { api } from '../services/api';
//import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"
import { Box, Button, TextField } from '@mui/material';

//api.get('Schedule/0/07_2022').then(response => setRegistros(response.data)).catch(e => console.log(e))

export default function Dashboard() {
    const { user, isAuthenticated } = useContext(AuthContext)

    return(
        <>
          <Button sx={{backgroundColor: "primary.dark"}}></Button>
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