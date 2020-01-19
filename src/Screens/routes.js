import React from 'react';
import ObjectsForm from './Objects/Form'
import ConditionalExpressionForm from './ConditionalExpressions/Form'
import {BrowserRouter,Switch, Route} from 'react-router-dom'

import UtilsDrawer from '../Components/Utils/Drawer/Drawer'

const Routes = () => {
    return (
    <BrowserRouter>
        <UtilsDrawer>
            <Switch>                
                <Route exact path="/project" component={ObjectsForm}/>
                <Route exact path="/project/objects" component={ObjectsForm}/>
                <Route exact path="/project/condExpression" component={ConditionalExpressionForm}/>
            </Switch>
        </UtilsDrawer>
    </BrowserRouter>
    )
}


export default Routes;