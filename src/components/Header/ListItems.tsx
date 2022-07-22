import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText }  from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </React.Fragment>
);
