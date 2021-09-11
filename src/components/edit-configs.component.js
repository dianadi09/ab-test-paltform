import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import { BASEURL} from "../consts";
import axios from "axios";


export default class EditConfigsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            mainVersion: '',
            minPercentage: '',
            currentPercentage: ''
        }

    }

    componentDidMount() {
        axios.get(BASEURL + 'configs/' + this.props.match.params.id)
            .then(response => {
                if (response.data.data.length > 0) {
                    let data = response.data.data[0];
                    this.setState({
                        name: data.name,
                        mainVersion: data.main.version,
                        minPercentage: data.main.minPercentage,
                        currentPercentage: data.main.currentPercentage
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getConfigsData() {
        return {
            name: this.state.name,
            main: {
                version: this.state.mainVersion,
                currentPercentage: this.state.currentPercentage,
                minPercentage: this.state.minPercentage
            }
        }
    }

    onSubmit = () => {
        let data = this.getConfigsData();
        axios.post(BASEURL + 'configs/update/' + this.props.match.params.id, data)
            .then(() => {
                this.setState({
                    redirect: true
                })
            });
    }

    onChangeConfigName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeMainVersion = (e) => {
        this.setState({
            mainVersion: e.target.value
        })
    }

    onChangeMainPercentage = (e) => {
        this.setState({
            currentPercentage: e.target.value
        })
    }


    onChangeMainMinPercentage = (e) => {
        this.setState({
            minPercentage: e.target.value
        })
    }


    render() {
        return (
            <React.Fragment>
                {this.state.redirect ? (<Redirect push to="/configs/"/>) : null}
                <div>
                    <h3>Edit Configuration</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Configs name: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.name}
                                   onChange={this.onChangeConfigName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Main version: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.mainVersion}
                                   onChange={this.onChangeMainVersion}
                            />
                        </div>
                        <div className="form-group">
                            <label>Main current percentage: </label>
                            <input type="text"
                                   readOnly
                                   className="form-control"
                                   value={this.state.currentPercentage}
                                   onChange={this.onChangeMainPercentage}
                            />
                        </div>
                        <div className="form-group">
                            <label>Main min percentage: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.minPercentage}
                                   onChange={this.onChangeMainMinPercentage}
                            />
                        </div>
                        <div style={{marginTop: '20px'}} className="form-group submit-btn">
                            <input type="submit" value="Edit Configs" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}