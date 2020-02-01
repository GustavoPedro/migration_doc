import React from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import ObjectsForm from './Pages/Objects'
import ProjectForm from './Pages/Project'
import ConditionalExpressionForm from './Pages/ConditionalExpressions'
import Drawer from './Components/Drawer'

const MainRoute = () => {
    return (
    <BrowserRouter>
        <Drawer>
            <Switch>                
                <Route exact path="/project" component={ObjectsForm}/>
                <Route exact path="/project/objects" component={ObjectsForm}/>
                <Route path="/project/condExpression" component={ConditionalExpressionForm}/>
            </Switch>
        </Drawer>
    </BrowserRouter>
    )
}

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ProjectForm} />
                <Route exact path="/project" component={MainRoute} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;