import React from 'react';
import MaterialTable from 'material-table';


export default function Table(props) {
  const { state, setState, title, handleRowAdd, handleRowUpdate, handleRowDelete } = props
  return (
    <MaterialTable
      actions={state.actions}
      title={title}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: async(newData) => await handleRowAdd(newData),
        onRowUpdate: async(newData, oldData) => await handleRowUpdate(oldData,newData),
        onRowDelete: async(oldData) => await handleRowDelete(oldData)          
      }}
    />
  );
}
