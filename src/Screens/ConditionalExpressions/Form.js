import React from 'react';
import { ConditionalExpressionsCRUD } from '../../Components/ConditionalExpressions/CRUD';
import UtilsDrawer from '../../Components/Utils/Drawer';

export default function ConditionalExpressionsForm(props){
    return (
        <UtilsDrawer>
            <ConditionalExpressionsCRUD />
        </UtilsDrawer>
    )
}

