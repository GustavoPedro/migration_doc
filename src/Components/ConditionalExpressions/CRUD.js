import React,{useState} from 'react';
import UtilsTable from '../Utils/Table'

const ConditionalExpressionCRUD = () => {
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
    <UtilsDrawer>
      <UtilsTable state={tableExprConditional} setState={setTableExprConditional} title={'Conditional Expressions'}/>
    </UtilsDrawer>
  );
}

export default ConditionalExpressionCRUD