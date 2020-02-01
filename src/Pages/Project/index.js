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
    const [IdClient, setIdClient] = useState(-1)
    const [selectedValueClient, setSelectedValueClient] = useState('');
    const [selectedValueProject, setSelectedValueProject] = useState('');
    const [IdProject,setIdProject] = useState(-1)
    const [redirectToMenu, setRedirectToMenu] = useState(false)
    const [openProjecs, setOpenProjects] = useState(false)
    const [projects, setProjects] = useState({
        actions: [
            {
                icon: 'add ',
                tooltip: 'Select Project',
                onClick: (event, rowData) => {
                    setSelectedValueProject(rowData.Name);
                    setIdProject(rowData.Id)
                    setOpenProjects(false)
                }
            }
        ],
        columns: [
            { title: 'Name', field: 'Name' },
            { title: 'Description', field: 'Description' },
        ],
        date: [

        ]
    })
    const [clients, setClients] = useState({
        actions: [
            {
                icon: 'add ',
                tooltip: 'Select Client',
                onClick: (event, rowData) => {
                    setSelectedValueClient(rowData.Name);
                    setOpen(false)
                    setIdClient(rowData.Id)
                    setProjects(prevState => {
                        const data = [...rowData.Projects]
                        return { ...prevState, data }
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

    const handleRowUpdateClient = (oldData, newData) => {
        axios.put(`Clients/${newData.Id}`, newData)
            .then(res => {
                console.log(res)
                if (res.status == 204) {
                    setClients(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                    });
                }
                return false;
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRowDeleteClient = (client) => {
        axios.delete(`Clients/${client.Id}`)
            .then(res => {
                if (res.status == 200) {
                    setClients(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(client), 1);
                        return { ...prevState, data };
                    });
                }
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
    };

    const handleRowAddProject = (project) => {        
        project.ClientID = IdClient
        axios.post('Projects', project)
            .then(res => {
                if (res.status == 201) {
                    setProjects((prevState) => {
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

    const handleRowUpdateProject = (oldData, newData) => {
        axios.put(`Projects/${newData.Id}`, newData)
            .then(res => {                
                if (res.status == 204) {
                    setProjects(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                    });
                }
                return false;
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRowDeleteProject = (project) => {
        axios.delete(`Projects/${project.Id}`)
            .then(res => {
                if (res.status == 200) {
                    setProjects(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(project), 1);
                        return { ...prevState, data };
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleCloseProjects = value => {
        setOpenProjects(false);
    };

    const handleOpenProjecs = () => {
        setOpenProjects(true)
    }

    const onClickContinue = () => {
        if (selectedValueClient && selectedValueProject && IdProject) {            
            localStorage.setItem("Project",JSON.stringify({IdProject: IdProject,NameProject: selectedValueProject}))
            setRedirectToMenu(true)
        }
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
                        <Input placeholder="Client" value={selectedValueClient} inputProps={{ 'aria-label': 'description' }} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Fab color="primary" onClick={handleOpen}>
                            <SearchIcon />
                        </Fab>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Input placeholder="Project" value={selectedValueProject} inputProps={{ 'aria-label': 'description' }} />
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
                <UtilsTable state={projects} setState={setProjects} title='Projects' handleRowAdd={handleRowAddProject} handleRowUpdate={handleRowUpdateProject} handleRowDelete={handleRowDeleteProject} />
            </Dialog>
        </div>
    );
}
