import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import * as actions from "../../store/actions";
import './Auth.scss';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }

    handleOnChangeInputUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handleOnChangeInputPassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin = async (e) => {
        e.preventDefault();
        this.setState({ errMessage: '' });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                // Redirect based on user type
                if (data.userType === 'BenhNhan') {
                    this.props.navigate('/home');
                } else if (data.userType === 'Admin') {
                    this.props.navigate('/system/user-redux');
                } else if (data.userType === 'BacSi') {
                    this.props.navigate('/doctor/manage-patient');
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({
                    password: '',
                    errMessage: error.response.data.message
                });
            }
        }
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin(e);
        }
    }

    render() {
        return (
            <section>
                <div className="login_form-box">
                    <div className="form-value">
                        <form>
                            <h2>Login</h2>
                            <div className="inputbox">
                                <input
                                    onChange={this.handleOnChangeInputUsername}
                                    value={this.state.username}
                                    type="text"
                                    required
                                />
                                <label>Username</label>
                            </div>
                            <div className="inputbox">
                                <input
                                    onChange={this.handleOnChangeInputPassword}
                                    onKeyDown={this.handleKeyDown}
                                    type="password"
                                    value={this.state.password}
                                    required
                                />
                                <label>Password</label>
                            </div>
                            <div className="forget">
                                <label>
                                    <input type="checkbox" name="remember-me" />Remember Me?
                                    <a href='/'>Forget Password</a>
                                </label>
                            </div>
                            <div className="message">{this.state.errMessage}</div>
                            <button onClick={this.handleLogin} type="button">Log in</button>
                            <div className='login-text'>
                                <p> Login with </p>
                            </div>
                            <div className="card-bottom">
                                <a className="btn-google btn-sm fw-bold text-uppercase" href="/oauth2/authorization/Google">
                                    <FaGoogle /> Google
                                </a>
                                <a className="btn-sm btn-facebook fw-bold text-uppercase" href="/oauth2/authorization/Facebook">
                                    <FaFacebook /> Facebook
                                </a>
                            </div>
                            <div className="register">
                                <p>Don't have an account? <Link to="/">Register</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
