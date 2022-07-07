import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import StickyHeadTable from './Table';

export default function Content() {
  return (
    <Paper sx={{overflow: 'hidden'}}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
      >
       
      </AppBar>
      <StickyHeadTable></StickyHeadTable>
    </Paper>
  );
}