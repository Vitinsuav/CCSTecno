import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import StickyHeadTable from './Table/Table';

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