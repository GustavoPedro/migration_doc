import React from 'react';
import ObjectsForm from './Objects/Form'
import ConditionalExpressionForm from './ConditionalExpressions/Form'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import ProjectSelect from '../Components/Project/Select'
import UtilsDrawer from '../Components/Utils/Drawer/Drawer'

const Routes = () => {
    return (
    <BrowserRouter>
        <UtilsDrawer>
            <Switch>
                <Route exact path="/" component={ProjectSelect}/>
                <Route exact path="/objects" component={ObjectsForm}/>
                <Route exact path="/condExpression" component={ConditionalExpressionForm}/>
            </Switch>
        </UtilsDrawer>
    </BrowserRouter>
    )
}


export default Routes;