import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditRegisterModal from '../Modals/EditRegisterModal';
import { Box } from '@mui/material';
import ExcluseConfirmationsModal from '../Modals/ExcluseConfirmationsModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

const ITEM_HEIGHT = 48;

interface ContextMenuProps {
  IdOfItem: string;
}

export default function ContextMenu( IdOfItem: ContextMenuProps ) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null); // colocar essa ação pós ações dos botoes para fechar o menu
  };

  const [editRegisterModalOpen, setEditRegisterModalOpen] = React.useState(false);

  const handleOpenEditRegisterModal = () => {
    console.log('editar...');
    setEditRegisterModalOpen(true);
    handleClose();
  }
  const handleCloseEditRegisterModal = () => { 
    setEditRegisterModalOpen(false);
    handleClose();
  }

  const [excluseModalOpen, setExcluseModalOpen] = React.useState(false);
  const handleOpenExcluseModal = () => { 
    setExcluseModalOpen(true);
    handleClose();
  }

  const handleCloseExcluseModal = () => {
    setExcluseModalOpen(false);
    handleClose();
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
          <MenuItem onClick={handleOpenEditRegisterModal}>
            <EditRegisterModal IdOfRegister={IdOfItem} isOpen={editRegisterModalOpen} requestClose={handleCloseEditRegisterModal}></EditRegisterModal>
            <Grid container >
              <Grid item xs={10}>Editar</Grid>
              <Grid item xs={2}><EditIcon/></Grid>
            </Grid>       
          </MenuItem>
          
          <MenuItem onClick={handleOpenExcluseModal}> 
            <ExcluseConfirmationsModal IdOfRegister={IdOfItem} isOpen={excluseModalOpen} requestClose={handleCloseExcluseModal}></ExcluseConfirmationsModal>
            <Grid container >
              <Grid item xs={10}>Excluir</Grid>
              <Grid item xs={2}><DeleteIcon/></Grid>
            </Grid> 
          </MenuItem>
        </Menu>
  </Box>
  
  );
}

