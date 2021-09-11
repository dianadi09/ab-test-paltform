import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {BASEURL} from "../consts";
import axios from "axios";

export default class EditTestComponent extends Component {

    constructor() {
        super();
        this.state = {
            owner: '',
            candidateVersion: '',
            candidatePercentage: '',
            redirect: false
        }
    }

    componentDidMount() {
        axios.get(BASEURL + 'tests/' + this.props.match.params.id)
            .then(response => {
                if (response.data.data.length > 0) {
                    let data = response.data.data[0];
                    this.setState({
                        owner: data.owner,
                        candidateVersion: data.candidateVersion,
                        candidatePercentage: data.candidatePercentage
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getTestData() {
        return {
            candidatePercentage: this.state.candidatePercentage
        }
    }

    onSubmit = () => {
        let data = this.getTestData();
        axios.post(BASEURL + 'tests/update/' + this.props.match.params.id, data)
            .then(() => this.setState({
                redirect: true
            }));
    }

    onChangeCandidatePercentage = (e) => {
        this.setState({
            candidatePercentage: e.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.redirect ? (<Redirect push to="/tests"/>) : null}
                <div>
                    <h3>Edit Test</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Test Owner: </label>
                            <input type="text"
                                   readOnly
                                   className="form-control"
                                   value={this.state.owner}
                            />
                        </div>
                        <div className="form-group">
                            <label>Candidate version: </label>
                            <input type="text"
                                   readOnly
                                   className="form-control"
                                   value={this.state.candidateVersion}
                            />
                        </div>
                        <div className="form-group">
                            <label>Candidate percentage: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.candidatePercentage}
                                   onChange={this.onChangeCandidatePercentage}
                            />
                        </div>
                        <div style={{marginTop: '20px'}} className="form-group submit-btn">
                            <input type="submit" value="Edit Test" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}