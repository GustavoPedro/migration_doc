import React, { useState } from 'react';
import UtilsTable from '../../Components/Table'
import Tabs from './Tabs'
import UtilsDialog from '../../Components/DialogFullScreen'


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
            handleOpenDialog(rowData)
        }
      }
    ]
  });  

  const handleOpenDialog = (rowData) => { 
    setRowData(rowData)
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <UtilsTable state={tableObjects} setState={setTableObjects} title="Objects" />    
      <UtilsDialog open={open}  handleCloseDialog={handleCloseDialog} object={rowData} title="Object Properties ">
          <Tabs/>
      </UtilsDialog>
    </div>
  )
}
