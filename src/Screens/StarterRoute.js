import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Routes from './routes'
import ProjectSelect from '../Components/Project/Select'
const StarterRoute = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ProjectSelect} />
                <Route exact path="/project" component={Routes} />
            </Switch>
        </BrowserRouter>
    )
}


export default StarterRoute;