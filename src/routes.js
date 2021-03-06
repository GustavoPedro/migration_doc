import React from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import Drawer from './Components/Drawer'
// Forms
import ObjectsForm from './Pages/Objects'
import ProjectForm from './Pages/Project'
import ConditionalExpressionForm from './Pages/ConditionalExpressions'
import ApplicationsForm from './Pages/Applications'
import GlobalDataRestrictionsForm from './Pages/GlobalDataRestrict'
import AutoScriptsForm from './Pages/AutoScripts'

const MainRoute = () => {
    return (
    <BrowserRouter>
        <Drawer>
            <Switch>                
                <Route exact path="/project" component={ObjectsForm}/>
                <Route exact path="/project/objects" component={ObjectsForm}/>
                <Route path="/project/condExpression" component={ConditionalExpressionForm}/>
                <Route path="/project/applications" component={ApplicationsForm}/>
                <Route path="/project/restrictions" component={GlobalDataRestrictionsForm}/>
                <Route path="/project/autoScript" component={AutoScriptsForm}/>
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