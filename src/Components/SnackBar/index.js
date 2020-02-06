import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './styles'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function CustomizedSnackbars(props) {
    const classes = useStyles();    
    const {open,msgType,msg,handleClose} = props
  
 
    return (
        <div className={classes.root}>      
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            {
                msgType == 'err' ? <Alert onClose={handleClose} severity="error">{msg}</Alert> : <Alert onClose={handleClose} severity="success">{msg}</Alert>
            }           
                
        </Snackbar>
        </div>
    );
}