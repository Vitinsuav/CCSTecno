import type { GetServerSideProps, NextPage } from 'next'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { parseCookies } from 'nookies'
import { withSSRGuest } from '../utils/withSSRGuest';

const theme = createTheme({
  palette: {
  primary: {
    main: '#0346a2',
  },
  secondary: {
    main: '#f44336',
  },
},
});

const Home: NextPage = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const { signIn } = useContext(AuthContext)

async function handleSubmit(event: FormEvent){
  event.preventDefault();

  const data = {
    email, 
    password,
  }
  await signIn(data)
}

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
       
        <Typography component="h1" variant="h6">
          <img src="https://www.ccstecno.com.br/wp-content/uploads/2019/12/cropped-logo-para-fundo-escuro-e1575483134654.png" width='357px' height='125px'></img>
        </Typography>
        <Box  component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color= 'primary'
            sx={{ mt: 3, mb: 2}}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default Home

export const getServerSideProps = withSSRGuest(async (ctx) => { //context
  
  return {
    props: {
      
    }
  }
})