import { createTheme } from '@mui/material/styles';

export const InputMonthModaltheme = createTheme({
    palette: {
      primary: {
        light: '#e9380c',
        main: '#3f51b5',
        dark: '#1E90FF',
      },
    secondary: {
        main:'#fff',
    },
}})
    
export const ExcluseModaltheme = createTheme({
    palette: {
        primary: {
            light: '#e9380c',
            main: '#f8cc06',
            dark: '#eecc0a',
        },
        secondary: {
            main:'#fff',
        },   
    
}})

export const CreateAndEditModalstyle = {
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

export const ExcluseModalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '3px',
    boxShadow: 24,
    p: 4,
};

export const InputModalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '3px',
    boxShadow: 24,
    p: 4,
  };
  
  