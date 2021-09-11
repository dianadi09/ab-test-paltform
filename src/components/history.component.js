import React, { Component } from 'react';
import axios from "axios";
import {BASEURL} from "../consts";
import {msToTime} from "../services/date-utils"

const HistoryTest = (props) => {
    return (
        <tr>
            <td>{props.test.owner}</td>
            <td>{props.test.mainVersion}</td>
            <td>{props.test.candidateVersion}</td>
            <td>{props.test.candidatePercentage}</td>
            <td>{new Date(props.test.startDate).toLocaleString()}</td>
            <td>{msToTime(props.test.testDuration)}</td>
        </tr>
    );
}
export default class HistoryComponent extends Component {
    constructor() {
        super();
        this.state = {
            historyTests: []
        }
    }

    componentDidMount() {
        axios.get(BASEURL + 'history/').then(response => {
            if (response.data.data.length > 0) {
                this.setState({
                    historyTests: response.data.data
                })
            }

        });
    }

    testsList() {
        return this.state.historyTests.map(currTest => {
            return <HistoryTest test={currTest} key={currTest._id}/>;
        })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="row">
                        <div className="col-sm">
                            <h2>History tests</h2>
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
                            <th>Test duration</th>
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