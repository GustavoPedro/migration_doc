import React, { useState, useEffect } from 'react';
import Table from '../../Components/Table';
import axios from '../../data/axios';
import Backdrop from '../../Components/Backdrop'
import SnackBar from '../../Components/SnackBar'

export default function AutoScriptsForm(props) {
  const [loading,setLoading] = useState(false)
  const [openSnackBarSucess,setOpenSnackBarSucess] = useState(false)
  const [openSnackBarErr,setOpenSnackBarErr] = useState(false)
  const [msg,setMsg] = useState('')
  const [project, setProject] = useState({})
  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'Name' },
      { title: 'Description', field: 'Description' },
    ],
    data: []
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
        let res = await axios.get(`AutoScripts?projectId=${project.IdProject}`)
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
      setMsg('Não foi possível carregar os Scripts')
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
    axios.post("AutoScripts", data)
      .then(res => {
        if (res.status == 201) {
          setState(prevState => {
            const data = [...prevState.data];
            data.push(res.data);
            return { ...prevState, data };
          });
          setMsg('Script cadastrada com sucesso ')
          setOpenSnackBarSucess(true)  
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
        setMsg('Não foi possível cadastrar script')
        setOpenSnackBarErr(true)
      })
      .finally(_ => setLoading(false))
  }

  const handleRowUpdate = (oldData, newData) => {
    setLoading(true)
    axios.put(`AutoScripts/${newData.Id}`, newData)
      .then(res => {
        console.log(res)
        if (res.status == 204) {
          setState(prevState => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = newData;
            return { ...prevState, data };
          });
          setMsg('Script atualizada com sucesso')
          setOpenSnackBarSucess(true)         
        }
        return false;
      })
      .catch(err => {
        console.log(err)
        setMsg('Não foi possível atualizar script')
        setOpenSnackBarErr(true)        
      })
      .finally(_ => setLoading(false))
  }

  const handleRowDelete = (newData) => {
    setLoading(true)
    axios.delete(`AutoScripts/${newData.Id}`)
      .then(res => {
        if (res.status == 200) {
          setState(prevState => {
            const data = [...prevState.data];
            data.splice(data.indexOf(newData), 1);
            return { ...prevState, data };
          });
          setMsg('Script deletada com sucesso')
          setOpenSnackBarSucess(true)
        }
      })
      .catch(err => {
        console.log(err)
        setMsg('Não foi possível deletar script')
        setOpenSnackBarErr(true)
      })
      .finally(_ => setLoading(false))     
  }

  return (
    <div>
      <Backdrop loading={loading}/>
      <SnackBar msgType="sucess" msg={msg} handleClose={handleCloseSnackBar} open={openSnackBarSucess} />
      <SnackBar msgType="err" msg={msg} handleClose={handleCloseSnackBar} open={openSnackBarErr} />
      <Table state={state} setState={setState} title={'Automation Scripts'} handleRowAdd={handleRowAdd} handleRowUpdate={handleRowUpdate} handleRowDelete={handleRowDelete} />
    </div>
  );
}
