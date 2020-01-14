import React from 'react';
import Object from './Objects/objects'
import ConditionalExpression from './ConditionalExpressions/conditionalExpression'
import {BrowserRouter,Router, Switch,Redirect, Route} from 'react-router-dom'
import CadastrarProjeto from './Projeto/cadastrarProjeto'

const Routes = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={CadastrarProjeto}/>
            <Route exact path="/objects" component={Object}/>
            <Route exact path="/condExpression" component={ConditionalExpression}/>
        </Switch>
    </BrowserRouter>
    )
}


export default Routes;