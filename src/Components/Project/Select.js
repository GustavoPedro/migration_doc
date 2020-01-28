import React, { useState,useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import useStyles from './ProjectStyles';
import Fab from '@material-ui/core/Fab';
import SimpleDialog from '../Utils/Dialog/Dialog'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import axios from "../../data/axios";

export default function ProjectSelect(props) {
    const classes = useStyles();    
    const [open, setOpen] = useState(true);
    const [selectedValue, setSelectedValue] = useState('');
    const [redirectToMenu, setRedirectToMenu] = useState(false)    
    const [data,setData] = useState()

    useEffect(() => {
        getData()
    },[])

    const getData = () => {
        axios.get("Clients")
        .then(res => {
            setData(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = value => {        
        setOpen(false);
        setSelectedValue(value);
    };

    const onClickContinue = () => {
        //if (projeto && cliente) {
            setRedirectToMenu(true)
        //}
    }

    return (
        <div>
            {redirectToMenu && <Redirect to='/project' />}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Projeto
                    </Typography>
                    <Button className={classes.buttonWhite} onClick={() => onClickContinue()}>Continuar</Button>
                </Toolbar>
            </AppBar>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '70vh' }}
            >
                <CssBaseline />
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <Input placeholder="Placeholder" value={selectedValue} inputProps={{ 'aria-label': 'description' }} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Fab color="primary" onClick={handleOpen}>
                            <SearchIcon />
                        </Fab>         
                    </FormControl>
                    <FormControl className={classes.formControl}>                    
                        <Input placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                    <Fab color="primary" onClick={handleOpen}>
                        <SearchIcon />
                    </Fab>
                    </FormControl>
                </Grid>
            </Grid>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} data={data} setData={setData} title="Select Client" />
        </div>
    );
}
