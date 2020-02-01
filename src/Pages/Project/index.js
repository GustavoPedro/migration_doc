import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import Fab from '@material-ui/core/Fab';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import axios from "../../data/axios";
import UtilsTable from '../../Components/Table'

export default function ProjectSelect(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [redirectToMenu, setRedirectToMenu] = useState(false)
    const [projects,setProjects] = useState()
    const [clients, setClients] = useState({
        actions:[
            {
                icon: 'add ',
                tooltip: 'Select Client',
                onClick: (event, rowData) => {
                    setSelectedValue(rowData.Name);
                    setOpen(false)
                    setProjects(prevState => {                        
                        let client = clients.data.filter(cli => {                            
                            return cli.Id > 1
                        })
                        console.log(client)
                        const projects = client.projects
                        return {...projects}
                    })
                }
            }
        ],
        columns: [
            { title: 'Client', field: 'Name' },
            { title: 'Description', field: 'Description' },
        ],
        data: [

        ]
    })
    const [openProjecs, setOpenProjects] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get("Clients")
            .then(res => {
                console.log(res.data)
                const data = res.data
                setClients(prevState => {
                    return { ...prevState, data }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRowAddClient = (client) => {
        axios.post('Clients', client)
            .then(res => {
                if (res.status == 201) {
                    setClients((prevState) => {
                        const data = [...prevState.data];
                        data.push(res.data);
                        return { ...prevState, data };
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRowUpdateClient = () => {

    }

    const handleRowDeleteClient = () => {

    }

    const handleOpen = () => {
        setOpen(true)
    }


    const handleClose = value => {
        setOpen(false);
    };

    const selectProject = value => {
        setSelectedValue(value);
    }

    const handleCloseProjects = value => {
        setOpenProjects(false);
        //setSelectedValue(value);
    };

    const handleOpenProjecs = () => {
        setOpenProjects(true)
    }


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
                        <Fab color="primary" onClick={handleOpenProjecs}>
                            <SearchIcon />
                        </Fab>
                    </FormControl>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <UtilsTable state={clients} setState={setClients} title='Clients' handleRowAdd={handleRowAddClient} handleRowUpdate={handleRowUpdateClient} handleRowDelete={handleRowDeleteClient} />
            </Dialog>
            <Dialog open={openProjecs} onClose={handleCloseProjects} aria-labelledby="form-dialog-title">
                <UtilsTable state={clients} setState={setClients} title='Projects' handleRowAdd={handleRowAddClient} handleRowUpdate={handleRowUpdateClient} handleRowDelete={handleRowDeleteClient} />
            </Dialog>
        </div>
    );
}
