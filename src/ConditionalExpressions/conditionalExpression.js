import React,{useState} from 'react';
import Drawer from '../Drawer/drawer';
import Table from '../Table'

const ConditionalExpression = () => {
  const [tableExprConditional, setTableExprConditional] = useState({
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
      <Table state={tableExprConditional} setState={setTableExprConditional} title={'Conditional Expressions'}/>
    </Drawer>
  );
}

export default ConditionalExpression