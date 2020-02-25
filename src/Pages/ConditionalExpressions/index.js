import React, { useState, useEffect } from 'react';
import Table from '../../Components/Table';
import axios from '../../data/axios';
import Backdrop from '../../Components/Backdrop'
import SnackBar from '../../Components/SnackBar'

export default function ConditionalExpressionForm(props) {
  const [loading,setLoading] = useState(false)
  const [openSnackBarSucess,setOpenSnackBarSucess] = useState(false)
  const [openSnackBarErr,setOpenSnackBarErr] = useState(false)
  const [msg,setMsg] = useState('')
  const [project, setProject] = useState({})
  const [state, setState] = useState({
    columns: [
      { title: 'ConditionNum', field: 'Conditionnum' },
      { title: 'Description', field: 'Description' },
    ],
    data: [
      
    ]
  })

  useEffect(() => {
    getData()
  }, []);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }
    setOpenSnackBarSucess(false);
    setOpenSnackBarErr(false)
};

  const getData = async () => {
    try {
      setLoading(true)
      let project = localStorage.getItem("Project")
      if (project) {
        project = JSON.parse(project)
        setProject(project)
        let res = await axios.get(`Conditions?projectId=${project.IdProject}`)
        if (res.status == 200) {
          setState(prevState => {
            const data = [...res.data]
            return { ...prevState, data }
          })
          console.log(res)
        }
      }
      else{
        console.log('Selecione um projeto')
      }
    }
    catch (err) {
      setMsg('Não foi possível carregar as condições')
      setOpenSnackBarErr(true)
      
    }
    finally{
      setLoading(false)
    }

  }

  const handleRowAdd = (newData) => {    
    setLoading(true)
    const data = {
      ...newData,
      ProjectID: project.IdProject
    }
    axios.post("Conditions", data)
      .then(res => {
        if (res.status == 201) {
          setState(prevState => {
            const data = [...prevState.data];
            data.push(res.data);
            return { ...prevState, data };
          });
          setMsg('Condição cadastrada com sucesso')
          setOpenSnackBarSucess(true)  
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
        setMsg('Não foi possível cadastrar condição')
        setOpenSnackBarErr(true)
      })
      .finally(_ => setLoading(false))
  }

  const handleRowUpdate = (oldData, condition) => {
    setLoading(true)
    axios.put(`Conditions/${condition.Id}`, condition)
      .then(res => {
        console.log(res)
        if (res.status == 204) {
          setState(prevState => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = condition;
            return { ...prevState, data };
          });
          setMsg('Condição atualizada com sucesso')
          setOpenSnackBarSucess(true)         
        }
        return false;
      })
      .catch(err => {
        console.log(err)
        setMsg('Não foi possível atualizar condição')
        setOpenSnackBarErr(true)        
      })
      .finally(_ => setLoading(false))
  }

  const handleRowDelete = (condition) => {
    setLoading(true)
    axios.delete(`Conditions/${condition.Id}`)
      .then(res => {
        if (res.status == 200) {
          setState(prevState => {
            const data = [...prevState.data];
            data.splice(data.indexOf(condition), 1);
            return { ...prevState, data };
          });
          setMsg('Condição deletada com sucesso')
          setOpenSnackBarSucess(true)
        }
      })
      .catch(err => {
        console.log(err)
        setMsg('Não foi possível deletar condição')
        setOpenSnackBarErr(true)
      })
      .finally(_ => setLoading(false))     
  }

  return (
    <div>
      <Backdrop loading={loading}/>
      <SnackBar msgType="sucess" msg={msg} handleClose={handleCloseSnackBar} open={openSnackBarSucess} />
      <SnackBar msgType="err" msg={msg} handleClose={handleCloseSnackBar} open={openSnackBarErr} />
      <Table state={state} setState={setState} title={'Conditional Expressions'} handleRowAdd={handleRowAdd} handleRowUpdate={handleRowUpdate} handleRowDelete={handleRowDelete} />
    </div>
  );
}
