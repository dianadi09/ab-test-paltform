import React, { Component } from 'react';
import axios from "axios";
import {BASEURL, ALL_AB_TESTS_ENABLED} from "../consts";
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Configs = (props) => {
    return (
        <tr>
            <td>{props.configs.name}</td>
            <td>{props.configs.main.version}</td>
            <td>{props.configs.main.currentPercentage}</td>
            <td>{props.configs.main.minPercentage}</td>
            <td>{props.isEnabled ? 'Yes' : 'No'}</td>
        </tr>
    );
}

export default class ConfigsComponent extends Component {

    constructor() {
        super();
        this.state = {
            abTestsEnabled: ALL_AB_TESTS_ENABLED,
            configs: []
        }
    }

    componentDidMount() {
        axios.get(BASEURL + 'configs/').then(response => {
            let res = response.data.data;
            this.setState({
                configs: res,
                id: res[0]._id
            })
        })

    }

    configData() {
        let isAbTestsEnabled = this.state.abTestsEnabled;
        return this.state.configs.map(currTest => {
            return <Configs configs={currTest} isEnabled={isAbTestsEnabled} key={currTest._id}/>;
        })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="row">
                        <div className="col-sm">
                            <h2>Configs</h2>
                            <Link to={"/config/edit/" + this.state.id} >
                                <button type="button" className="btn btn-lg btn-primary">Edit configuration</button>
                            </Link>
                        </div>
                    </div>
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th>Configs name</th>
                            <th>Main version</th>
                            <th>Main current percentage</th>
                            <th>Main minimum allowed percentage</th>
                            <th>AB tests enabled</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.configData()}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}