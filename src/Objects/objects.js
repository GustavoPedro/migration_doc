import React, { useState } from 'react';
import Table from '../Table'
import Drawer from '../Drawer/drawer'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import useStyles from './styles'

export default function Objects(props) {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null)
  const classes = useStyles()   
  const [tableObjects, setTableObjects] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Description', field: 'description' },
    ],
    data: [
      { name: 'Gustavo', description: 'Pedro' }
    ],
    actions : [
      {
        icon: 'add',
        tooltip: 'Adicionar Atributos',
        onClick: (event, rowData) => { 
            // ================== Exemplo adicionando dados ================================

            // setTableAttributes(prevState => {
            //   const data = [...prevState.data];
            //   const dado = {'name': 'Dougras','description': 'douflas'}
            //   data.push(dado);
            //   return { ...prevState, data };
            // })   
            
            // ==============================================================================        
            handleOpenModal(rowData)
        }
      }
    ]
  });
  const [tableAttributes, setTableAttributes] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Description', field: 'description' },
    ],
    data: [
      { name: 'Gustavo', description: 'Pedro' }
    ],   
  });

  const handleOpenModal = (rowData) => {
    setRowData(rowData) 
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  
  return (
    <Drawer>
      <Table state={tableObjects} setState={setTableObjects} title="Objects" />
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
              <Table state={tableAttributes} setState={setTableAttributes} title={`Attributes for object ${rowData && rowData.name}`} />
              </div>
          </Fade>
      </Modal>    
    </Drawer>
  )
}
