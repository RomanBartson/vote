import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Index from '../ui/Index.js';
import Edit from '../ui/Edit.js';

class NotFound extends Component {
    render() {
        return (<div style={{textAlign: 'center'}}>Not found!</div>);
    }
}

const RouterContainer = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/edit">Edit</Link></li>
            </ul>

            <hr />

            <Switch >
                <Route exact path="/" component={Index} />
                <Route path="/edit" component={Edit} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);
export default RouterContainer;
