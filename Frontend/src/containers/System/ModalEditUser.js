import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/Emitter'
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'userpassword',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                roleId: user.roleId,
                gender: user.gender
            })
        }
    }

    toggle() {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidInput = () => {
        let isValid = true;
        //let arrInput = ['email', 'firstName', 'lastName', 'password', 'address', 'phoneNumber', 'roleId'];
        let arrInput = Object.keys(this.state);
        for (let i = 0; i < arrInput.length; i++) {
            if (arrInput[i] === 'roleId' || arrInput[i] === 'gender') {
                continue;
            }
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = (e) => {
        e.preventDefault();
        let idValid = this.checkValidInput();
        if (idValid === true) {
            this.props.editUser(this.state);
        }
    }

    handleResetUser = (e) => {
        e.preventDefault();
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        })
    }

    render() {

        return (
            < Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='abcClassName'
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Add</ModalHeader >
                <ModalBody>
                    <div class="">
                        <form action="/post-crud" method="post" class="row g-3 col-md-12 mx-auto">
                            <h3 class="col-12 mt-4 text-center">Edit user</h3>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Email</label>
                                <input onChange={(e) => this.handleOnChangeInput(e, "email")} disabled
                                    value={this.state.email} type="email" class="form-control" />
                            </div>
                            <div class="col-md-6">
                                <label for="inputPassword4" class="form-label">Password</label>
                                <input onChange={(e) => this.handleOnChangeInput(e, "password")} disabled
                                    value={this.state.password} type="password" class="form-control" />
                            </div>
                            <div class="col-6">
                                <label for="inputAddress" class="form-label">First name</label>
                                <input onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                                    value={this.state.firstName} type="text" class="form-control" placeholder="" />
                            </div>
                            <div class="col-6">
                                <label for="inputAddress" class="form-label">Last name</label>
                                <input onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                                    value={this.state.lastName} type="text" class="form-control" placeholder="" />
                            </div>
                            <div class="col-md-3">
                                <label for="inputAddress2" class="form-label">Address</label>
                                <input onChange={(e) => this.handleOnChangeInput(e, "address")}
                                    value={this.state.address} type="text" class="form-control" placeholder="" />
                            </div>
                            <div class="col-md-3">
                                <label for="inputAddress2" class="form-label">Phone number</label>
                                <input onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
                                    value={this.state.phoneNumber} type="text" class="form-control" placeholder="" />
                            </div>
                            <div class="col-md-3">
                                <label for="inputState" class="form-label">Sex:</label>
                                <select onChange={(e) => this.handleOnChangeInput(e, "gender")}
                                    value={this.state.gender} id="inputState" class="form-select">
                                    <option value="F" selected>Female</option>
                                    <option value="M">Male</option>
                                    <option value="O">Other</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="inputState" class="form-label">Role:</label>
                                <select onChange={(e) => this.handleOnChangeInput(e, "roleId")}
                                    value={this.state.roleId || "role_admin"} id="inputState" class="form-select">
                                    <option value="role_admin">Admin</option>
                                    <option value="role_doctor">Doctor</option>
                                    <option value="role_patient">Patient</option>
                                </select>
                            </div>

                            <div class="col-2 mx-auto mb-4">
                                <button onClick={(e) => this.handleSaveUser(e)} class="btn btn-primary">Save</button>
                            </div>
                            <div class="col-2 mx-auto mb-4">
                                <button onClick={(e) => this.handleResetUser(e)} class="btn btn-success">Reset</button>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter />
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

