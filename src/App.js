import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './components/navbar/navbar.component';
import CurrentTests from './components/current-tests.component';
import CreateTest from './components/create-test.component';
import EditCurrentTest from './components/edit-test.component';
import Configs from './components/configs.component';
import History from './components/history.component';
import EditConfigs from './components/edit-configs.component';
import Users from './components/users.component';


function App() {
    return (
        <Router>
            <div className="container">
                <Navbar/>
                <br/>
                <Route path="/" exact component={CurrentTests}/>
                <Route path="/tests/" exact component={CurrentTests}/>
                <Route path="/tests/create" component={CreateTest}/>
                <Route path="/tests/edit/:id" component={EditCurrentTest}/>
                <Route path="/config/edit/:id" component={EditConfigs}/>
                <Route path="/history/" component={History}/>
                <Route path="/configs/" component={Configs}/>
                <Route path="/users/" component={Users}/>
            </div>
        </Router>
    );
}

export default App;
