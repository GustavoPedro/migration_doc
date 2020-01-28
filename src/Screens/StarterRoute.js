import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Routes from './routes'
import ProjectForm from '../Screens/Project/Form'
const StarterRoute = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ProjectForm} />
                <Route exact path="/project" component={Routes} />
            </Switch>
        </BrowserRouter>
    )
}


export default StarterRoute;