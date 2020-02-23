import React, { useState, useEffect } from 'react';
import Table from '../../../Components/Table'
import axios from '../../../data/axios';
import Backdrop from '../../../Components/Backdrop'
import SnackBar from '../../../Components/SnackBar'

export default function RelationshipsCRUD(props) {
    const [openSnackBarSucess, setOpenSnackBarSucess] = useState(false)
    const [openSnackBarErr, setOpenSnackBarErr] = useState(false)
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const { object } = props
    const [state, setState] = useState({
        columns: [
            { title: 'Name', field: 'Name' },
            { title: 'Child', field: 'Child' },
            { title: 'Description', field: 'Description' },
            { title: 'WhereClause', field: 'WhereClause' },            
        ],
        data: [

        ],
    });

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
            if (object) {
                setLoading(true)

                let res = await axios.get(`MaxRelationships/GetFromObject?objectCfgID=${object.Id}`)
                if (res.status == 200) {
                    setState(prevState => {
                        const data = [...res.data]
                        return { ...prevState, data }
                    })
                    console.log(res)
                }
            }
            else {
                console.log('Selecione um objeto')
            }
        }
        catch (err) {
            setMsg('Não foi possível carregar os relacionamentos')
            setOpenSnackBarErr(true)

        }
        finally {
            setLoading(false)
        }

    }

    const handleRowAdd = (newData) => {
        setLoading(true)
        const data = {
            ...newData,
            Parent: object.Name,
            ObjectCfgID: object.Id
        }
        axios.post("MaxRelationships", data)
            .then(res => {
                if (res.status == 201) {
                    setState(prevState => {
                        const data = [...prevState.data];
                        data.push(res.data);
                        return { ...prevState, data };
                    });
                    setMsg('Relacionamento cadastrado com sucesso ')
                    setOpenSnackBarSucess(true)
                }
                console.log(res)
            }).catch(err => {
                console.log(err)
                setMsg('Não foi possível cadastrar relacionamento')
                setOpenSnackBarErr(true)
            })
            .finally(_ => setLoading(false))
    }

    const handleRowUpdate = (oldData, newData) => {
        setLoading(true)
        axios.put(`MaxRelationships/${newData.Id}`, newData)
            .then(res => {
                console.log(res)
                if (res.status == 204) {
                    setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                    });
                    setMsg('Relacionamento atualizado com sucesso')
                    setOpenSnackBarSucess(true)
                }
                return false;
            })
            .catch(err => {
                console.log(err)
                setMsg('Não foi possível atualizar relacionamento')
                setOpenSnackBarErr(true)
            })
            .finally(_ => setLoading(false))
    }

    const handleRowDelete = (newData) => {
        setLoading(true)
        axios.delete(`MaxRelationships/${newData.Id}`)
            .then(res => {
                if (res.status == 200) {
                    setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(newData), 1);
                        return { ...prevState, data };
                    });
                    setMsg('Relacionamento deletado com sucesso')
                    setOpenSnackBarSucess(true)
                }
            })
            .catch(err => {
                console.log(err)
                setMsg('Não foi possível deletar relacionamento')
                setOpenSnackBarErr(true)
            })
            .finally(_ => setLoading(false))
    }

    return (
        <div>
            <Backdrop loading={loading} />
            <SnackBar msgType="sucess" msg={msg} handleClose={handleCloseSnackBar} open={openSnackBarSucess} />
            <SnackBar msgType="err" msg={msg} handleClose={handleCloseSnackBar} open={openSnackBarErr} />
            <Table state={state} setState={setState} title={`Relacionamentos para o objeto ${object && object.Name}`} handleRowAdd={handleRowAdd} handleRowUpdate={handleRowUpdate} handleRowDelete={handleRowDelete} />
        </div>
    )
}
