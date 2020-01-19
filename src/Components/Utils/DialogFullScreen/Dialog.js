import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './DialogStyles'
import Transition from './DialogTransitions'



export default function FullScreenDialog(props) {
  const classes = useStyles();
  const {open,handleCloseDialog,title} = props; 

  return (
    <div>      
      <Dialog fullScreen open={open} onClose={handleCloseDialog} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>            
          </Toolbar>
        </AppBar>
        {props.children}
      </Dialog>
    </div>
  );
}
