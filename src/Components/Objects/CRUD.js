import React, { useState } from 'react';
import UtilsTable from '../Utils/Table'
import useStyles from './ObjectsStyles'
import AttributesCRUD from '../Attributes/CRUD'

export default function ObjectsCRUD(props) {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null)  
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

  const handleOpenModal = (rowData) => { 
    setRowData(rowData)
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <UtilsTable state={tableObjects} setState={setTableObjects} title="Objects" />    
      <AttributesCRUD  open={open} handleCloseModal={handleCloseModal} object={rowData}/>
    </div>
  )
}
