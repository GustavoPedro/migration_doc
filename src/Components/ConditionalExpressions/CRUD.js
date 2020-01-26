import React, { useState, useEffect } from 'react';
import UtilsTable from '../Utils/Table';
import axios from '../../data/axios';

export default function ConditionalExpressionCRUD(props) {
  const [state, setState] = useState({
    columns: [
      { title: 'ConditionNum', field: 'conditionnum' },
      { title: 'Description', field: 'description' },
    ],
    data: [
      { id: 'Eae', conditionnum: 'Gustavo', description: 'Pedro' }
    ]
  })

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      let res = await axios.get("Conditions")
      if (res.status == 200) {
        setState(prevState => {
          const data = [...res.data]
          return { ...prevState, data }
        })
      }
    }
    catch (err) {
      console.log(err)
    }

  }

  const handleRowAdd = (newData) => {
    const data = {
      ...newData,
      ProjectID: 2
    }
    axios.post("Conditions", data)
      .then(res => {
        if (res.status == 201) {
          setState(prevState => {
            const data = [...prevState.data];
            data.push(res.data);
            return { ...prevState, data };
          });
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }

  const handleRowUpdate = (oldData,condition) => {
    axios.put(`Conditions/${condition.id}`, condition)
      .then(res => {
        console.log(res)
        if (res.status == 204) {
          setState(prevState => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = condition;
            return { ...prevState, data };
          });
        }
        return false;
      })
      .catch(err => {
        console.log(err)        
      })
  }

  const handleRowDelete = (condition) => {
    axios.delete(`Conditions/${condition.id}`)
      .then(res => {
        if (res.status == 200) {
          setState(prevState => {
            const data = [...prevState.data];
            data.splice(data.indexOf(condition), 1);
            return { ...prevState, data };
          });
        }
      })
      .catch(err => {
        console.log(err)        
      })
  }

  return (
    <div>
      <UtilsTable state={state} setState={setState} title={'Conditional Expressions'} handleRowAdd={handleRowAdd} handleRowUpdate={handleRowUpdate} handleRowDelete={handleRowDelete} />
    </div>
  );
}
