import React, { useState } from 'react'
import UtilsTable from '../../../Components/Table'
import useStyles from './styles'

export default function AttributesForm(props) {
    const classes = useStyles()
    const {object} = props
    const [tableAttributes, setTableAttributes] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Description', field: 'description' },
        ],
        data: [
            { name: 'Gustavo', description: 'Pedro' }
        ],
    });
    return (
        <div className={classes.paper}>
            <UtilsTable state={tableAttributes} setState={setTableAttributes} title={`Attributes for object ${object && object.name}`} />
        </div>
    )
}