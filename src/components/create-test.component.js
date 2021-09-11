import React, {Component} from 'react';
import axios from "axios";
import {BASEURL} from "../consts";
import { Redirect } from 'react-router-dom';

export default class CreateTestComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            candidateVersion: '',
            candidatePercentage: '',
            mainCurrentPercentage: '',
            redirect: false
        }
    }

    componentDidMount() {
        axios.get(BASEURL + 'configs/main').then(response => {
            if(response.data.data.length > 0) {
                let data =  response.data.data[0];
                let currentMainPercentage = data.currentPercentage ? data.currentPercentage : 0;
                this.setState({
                    mainCurrentPercentage: currentMainPercentage
                })
            }


        });
    }

    getTestData() {
        return {
            owner: this.state.owner,
            candidateVersion: this.state.candidateVersion,
            candidatePercentage: this.state.candidatePercentage
        }
    }


    onSubmit = (e) => {
        e.preventDefault();

        let data = this.getTestData();
        axios.post(BASEURL + 'tests/create', data)
            .then(()=> this.setState({
                redirect: true
            }));

    }

    onChangeOwner = (e) => {
        this.setState({
            owner: e.target.value
        })
    }

    onChangeCandidateVersion = (e) => {
        if (this.state.mainCurrentPercentage - e.target.value < 10) {
            alert("Please pay attention, there is less than 10% traffic left!Please use less than 10% for the test");
            return;
        }
        this.setState({
            candidateVersion: e.target.value
        })
    }

    onChangeCandidatePercentage = (e) => {
        this.setState({
            candidatePercentage: e.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                { this.state.redirect ? (<Redirect push to="/tests"/>) : null }
                <div>
                    <h3>Create New Test</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Test Owner: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.owner}
                                   onChange={this.onChangeOwner}
                            />
                        </div>
                        <div className="form-group">
                            <label>Candidate version: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.candidateVersion}
                                   onChange={this.onChangeCandidateVersion}
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
                        <div style={{marginTop:'20px'}} className="form-group submit-btn">
                            <input type="submit" value="Create Test" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}