import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Index from '../ui/Index.js';
import Edit from '../ui/Edit.js';
import App from '../ui/App.js';

class NotFound extends Component {
    render() {
        return (<div style={{textAlign: 'center', color: 'white'}}>Not found!</div>);
    }
}

const RouterContainer = () => (
    <Router>
        <div>
            <Switch >
                <Route exact path="/" component={Index} />
                <Route path="/edit" component={Edit} />
                <Route path="/pdf" component={App} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);
export default RouterContainer;
