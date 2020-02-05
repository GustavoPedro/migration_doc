import React, { useState, useEffect } from 'react';
import Table from '../../Components/Table';
import axios from '../../data/axios';

export default function ApplicationsForm(props) {

    const [project, setProject] = useState({})
    const [state, setState] = useState({
        columns: [
            { title: 'Application Name', field: 'Name' },
            { title: 'Description', field: 'Description' },
        ],
        data: [

        ]
    })

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        try {
            let project = localStorage.getItem("Project")
            if (project) {
                project = JSON.parse(project)
                setProject(project)
                let res = await axios.get(`Applications?projectId=${project.IdProject}`)
                if (res.status == 200) {
                    setState(prevState => {
                        const data = [...res.data]
                        return { ...prevState, data }
                    })
                    console.log(res)
                }
            }
            else {
                console.log('Selecione um projeto')
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    const handleRowAdd = (newData) => {
        const data = {
            ...newData,
            ProjectID: project.IdProject
        }
        axios.post("Applications", data)
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

    const handleRowUpdate = (oldData, application) => {
        axios.put(`Applications/${application.Id}`, application)
            .then(res => {
                console.log(res)
                if (res.status == 204) {
                    setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = application;
                        return { ...prevState, data };
                    });
                }
                return false;
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRowDelete = (application) => {
        axios.delete(`Applications/${application.Id}`)
            .then(res => {
                if (res.status == 200) {
                    setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(application), 1);
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
            <Table state={state} setState={setState} title={'Applications'} handleRowAdd={handleRowAdd} handleRowUpdate={handleRowUpdate} handleRowDelete={handleRowDelete} />
        </div>
    );
}
