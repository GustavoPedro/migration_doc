import React,{useState} from 'react';
import Table from '../Table'
import Drawer from '../Drawer/drawer'


export default function Objects() {
  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Description', field: 'description' },
    ],
    data: [
      { name: 'Gustavo', description: 'Pedro' }
    ],
  });
  return (
    <Drawer>
      <Table state={state} setState={setState} title="Objects" />
    </Drawer>
  )
}
