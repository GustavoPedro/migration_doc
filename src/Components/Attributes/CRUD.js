import React,{useState} from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import UtilsTable from '../Utils/Table'
import useStyles from '../Objects/ObjectsStyles'

export default function AttributesCRUD(props) {
const classes = useStyles()
const {open,handleCloseModal,object} = props
const [tableAttributes, setTableAttributes] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Description', field: 'description' },
    ],
    data: [
      { name: 'Gustavo', description: 'Pedro' }
    ],   
});
return ( 
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <UtilsTable state={tableAttributes} setState={setTableAttributes} title={`Attributes for object ${object && object.name}`} />
                </div>
            </Fade>
        </Modal>
    )
}