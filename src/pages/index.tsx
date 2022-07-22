import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Logintheme as theme} from '../styles/Pages/StyledLogin'

const Home: NextPage = () => {

const [login, setLogin] = useState('')
const [password, setPassword] = useState('')

const { SignIn } = useContext(AuthContext)

async function handleSubmit(event: FormEvent){
  event.preventDefault();

  const data = {
    login, 
    password,
  }
  await SignIn(data)
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
            value={login}
            autoFocus
            onChange={e => setLogin(e.target.value)}
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
