import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import useStyles from './ProjectStyles';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import ProjectAddNew from './AddNew'


export default function ProjectSelect(props) {
    const classes = useStyles();
    const [projeto, setProjeto] = useState('')
    const [cliente, setCliente] = useState('')
    const [openProjejo, setOpenProjeto] = useState(false);
    const [openCliente, setOpenCliente] = useState(false);
    const [redirectToMenu, setRedirectToMenu] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [btnModalText,setBtnModalText] = useState('')
    const [btnModalOnClick,setBtnModalOnClick] = useState(function(){})

    const btnModalOnClickCliente = () => {
         return (nome,descricao) => {
            
         }
    }

    const btnModalOnClickProjeto = () => {
        return (nome,descricao) => {
            
        }
    }

    const handleOpenModal = (modal) => {
        if (modal === 'CLIENTE') {
            setBtnModalText('Adicionar Cliente')            
            setBtnModalOnClick(eval(btnModalOnClickCliente))
            setOpenModal(true);
        }
        else if (modal === 'PROJETO'){
            if (cliente) {
                setBtnModalText('Adicionar Projeto')
                setBtnModalOnClick(btnModalOnClickProjeto)
                setOpenModal(true);
            }
            else{
                alert('Você deve selecionar o cliente primeiramente')
            } 
        }
        
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChangeProjeto = event => {
        setProjeto(event.target.value);
    };

    const handleCloseProjeto = () => {
        setOpenProjeto(false);
    };

    const handleOpenProjeto = () => {
        setOpenProjeto(true);
    };

    const handleCloseCliente = () => {
        setOpenCliente(false);
    };

    const handleOpenCliente = () => {
        setOpenCliente(true);
    };

    const handleChangeCliente = event => {
        setCliente(event.target.value);
    };

    const onClickContinue = () => {
        if (projeto && cliente) {
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
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openCliente}
                            onClose={handleCloseCliente}
                            onOpen={handleOpenCliente}
                            value={cliente}
                            onChange={handleChangeCliente}
                        >
                            <MenuItem value={10}>QGOG</MenuItem>
                            <MenuItem value={20}>EDF</MenuItem>
                            <MenuItem value={30}>BHGE</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Button variant="contained" color="secondary" onClick={() => handleOpenModal('CLIENTE')}>
                            Cadastrar Cliente
                        </Button>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openProjejo}
                            onClose={handleCloseProjeto}
                            onOpen={handleOpenProjeto}
                            value={projeto}
                            onChange={handleChangeProjeto}
                        >
                            <MenuItem value={10}>QGOG</MenuItem>
                            <MenuItem value={20}>EDF</MenuItem>
                            <MenuItem value={30}>BHGE</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Button variant="contained" color="secondary" onClick={() => handleOpenModal('PROJETO')}>
                            Cadastrar Projeto
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
           <ProjectAddNew openModal={openModal} handleCloseModal={handleCloseModal} classes={classes} btnText={btnModalText} btnModalOnClick={btnModalOnClick}/>           
        </div>
    );
}
