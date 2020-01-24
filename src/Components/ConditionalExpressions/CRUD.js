import React, { useState } from 'react';
import UtilsTable from '../Utils/Table';
import axios from 'axios';

const ConditionalExpressionCRUD = () => {
  let isMounted = true;
  const getData = () => {

  }
  const [state,setState] = useState({
    columns: [
      { title: 'ConditionNum', field: 'Conditionnum' },
      { title: 'Description', field: 'Description' },
    ],
    data: [
      { Conditionnum: 'Gustavo', Description: 'Pedro' }
    ]
  })

  const handleRowAdd = (newData) => {
      const data ={
        ...newData,
        ProjectID: 2
      }
      axios.post("http://localhost:5000/Conditions",data)
      .then(res => {
        console.log(res)
      }).catch(err =>{
        console.log(err)
      })
  }

  const handleRowUpdate = (oldData,newData) => {
    console.log(newData)
  }

  const handleRowDelete= (oldData,newData) => {
    console.log(newData)
  }

return (
  <div>
    <UtilsTable state={state} setState={setState} title={'Conditional Expressions'} handleRowAdd={handleRowAdd} />
  </div>
);
}

export default ConditionalExpressionCRUD