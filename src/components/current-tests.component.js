import React, {Component} from 'react';
import Test from "./test.component";
import {BASEURL, MAIN_MIN_PERCENTAGE} from "../consts";
import axios from "axios";
import {Link} from "react-router-dom";

const newTestButton = canCreateTest => {
    return (
        canCreateTest
            ? <Link to="/tests/create">
                <button type="button" className="btn btn-lg btn-primary">Create new test</button>
            </Link>
            : <Link to="/">
                <button type="button" className="btn btn-lg btn-primary btn-warning" disabled>Create new test</button>
            </Link>
    )
}

export default class CurrentTestsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            canCreateTest: true,
            currentMainPercentage: 0
        }
    }

    componentDidMount() {
        axios.get(BASEURL + 'tests/')
            .then((response) => {
                const tests = response.data.data;
                axios.get(BASEURL + 'configs/main').then((response) => {
                    if(response.data.data.length > 0) {
                        let data = response.data.data[0];
                        let currentMainPercentage = data.currentPercentage ?data.currentPercentage : 0;
                        this.setState({...this.state, canCreateTest: currentMainPercentage > MAIN_MIN_PERCENTAGE, currentMainPercentage: currentMainPercentage, tests: tests})
                    }
                })
            });
    }

    finishTest = id => {
        axios.delete(BASEURL + 'tests/finish/' + id)
            .then(() => {
                axios.get(BASEURL + 'configs/main').then((response) => {
                    if(response.data.data.length > 0) {
                        let data = response.data.data[0];
                        let currentMainPercentage = data.currentPercentage ? data.currentPercentage : 0;
                        this.setState({...this.state, canCreateTest: currentMainPercentage > MAIN_MIN_PERCENTAGE, currentMainPercentage: currentMainPercentage, tests: this.state.tests.filter(el => el._id !== id)})
                    }

                })
            });
    }

    testsList() {
        return this.state.tests.map(currTest => {
            return <Test test={currTest} finishTest={this.finishTest} key={currTest._id}/>;
        })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="row">
                        <div className="col-sm">
                            <h2>Current tests</h2>
                        </div>
                        <div className="col-sm">
                            <h4>Main percentage: {this.state.currentMainPercentage}</h4>
                        </div>
                        <div className="col-sm">
                            {
                                newTestButton(this.state.canCreateTest)
                            }
                        </div>
                    </div>
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th>Owner</th>
                            <th>Main version</th>
                            <th>Candidate version</th>
                            <th>Candidate percentage</th>
                            <th>Start date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.testsList()}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}