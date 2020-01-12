import React,{useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

export default function AddClient(props) { 
    const {classes,openModal,handleCloseModal,btnText,btnModalOnClick} = props
    const [nome,setNome] = useState('')
    const [descricao,setDescricao] = useState('')
    return (    
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={openModal}>
            <div className={classes.paper}>
                <FormControl className={classes.formControl}>
                    <TextField required id="standard-required" label="Required" defaultValue="Nome" onChange={(event) => setNome(event.target.value)} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField required id="standard-required" label="Required" defaultValue="Descrição" onChange={(event) => setDescricao(event.target.value)} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Button variant="contained" color="secondary" style={{ marginTop: 10 }} onClick={() => btnModalOnClick(nome,descricao)}>
                       {btnText}
                    </Button>
                </FormControl>
            </div>
        </Fade>
    </Modal>
    );
};


