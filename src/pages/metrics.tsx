import * as React from 'react';
import { useContext} from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Button } from '@mui/material';

//api.get('Schedule/0/07_2022').then(response => setRegistros(response.data)).catch(e => console.log(e))

export default function Metrics() {
    const { user, isAuthenticated } = useContext(AuthContext)

    return(
        <>
          <Button sx={{backgroundColor: "primary.dark"}}></Button>
            <h1> pagina de testes:  </h1>
        </>

    )
}
