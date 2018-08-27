import {connect} from 'react-redux';
import React, {Component} from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextFieldGroup from './textFieldGroup/TextFieldGroup';
import './LoginView.scss';

class LoginView extends Component {
    focusUsernameInputField = (input) => {
        if (input) {
            setTimeout(() => {
                input.focus()
            }, 100);
        }
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (true) {
            this.props.login(
                {
                    user:
                        {
                            username: this.state.identifier,
                            password: this.state.password
                        }
                }
            );
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    render = () => {
        const {identifier, password} = '';

        return (
            <div className="log-in-style-1">
                <div></div>
                <div>
                    <MuiThemeProvider>
                        <form>
                            {/*<h3>Login</h3>*/}
                            {this.state.auth.user.errors !== '' &&
                            <div
                                style={{
                                    borderBottomLeftRadius: '0px',
                                    borderBottomRightRadius: '0px',
                                    borderTopLeftRadius: '0px',
                                    borderTopRightRadius: '0px',
                                }}
                                className="alert alert-danger">{this.state.auth.user.errors}
                            </div>}
                            <TextFieldGroup
                                focusUsernameInputField={this.focusUsernameInputField}
                                field="identifier"
                                label="Username"
                                value={identifier}
                                onChange={this.onChange}
                                placeholder="User"
                            />

                            <TextFieldGroup
                                field="password"
                                label="Password"
                                value={password}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                            />
                            <p><a href="">Forgot password?</a></p>
                            <div className="form-group">
                                <div className="raised-button-main-1">
                                    <div></div>
                                    <div>
                                        <RaisedButton
                                            onClick={this.onSubmit}
                                            label="Login"
                                            backgroundColor={'#ededed'}
                                            fullWidth={true}
                                            disabled={this.props.user.isAuthenticated}/>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </form>
                    </MuiThemeProvider>
                </div>
                <div></div>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            auth: {user: {errors: ''}},
        };
    }

    componentWillMount() {
        this.setState({auth: {user: {errors: ''}}});
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.user !== this.props.user) {
            this.setState({auth: nextprops.user});
            if (nextprops.user.isAuthenticated) {
                this.props.toggleLogIn();
            }
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth || {}
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showFlashMessage: (data) => dispatch({type: 'ADD_FLASH_MESSAGE', data}),
        login: (data) => dispatch({type: 'SET_CURRENT_USER', data})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView)