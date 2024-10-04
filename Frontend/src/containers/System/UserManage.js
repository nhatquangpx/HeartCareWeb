import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/Emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    hanldeAddnewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode !== 0) {
                alert(res.errMsg);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode !== 0) {
                alert(res.errMsg);
            } else {
                await this.getAllUsersFromReact();
                alert('Delete user successfully');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    hanldeEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })

                await this.getAllUsersFromReact();
            } else {
                alert(res.errCode);
            }
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <>
                <Container>
                    <div className="user-container  mt-3">
                        <ModalUser
                            isOpen={this.state.isOpenModalUser}
                            toggleFromParent={this.toggleUserModal}
                            createNewUser={this.createNewUser}
                        />
                        {
                            this.state.isOpenModalEditUser &&
                            <ModalEditUser
                                isOpen={this.state.isOpenModalEditUser}
                                toggleFromParent={this.toggleUserEditModal}
                                currentUser={this.state.userEdit}
                                editUser={this.doEditUser}
                            />
                        }
                        <h2 className="title text-center">List user</h2>
                        <div className="col-1 mb-2">
                            <button onClick={() => this.hanldeAddnewUser()} className='btn btn-primary'><i className='fas fa-plus'></i> Add new</button>
                        </div>
                        <div className="user-table">
                            <table class="table table-success table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>Address</th>
                                        <th colSpan={2}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        arrUsers && arrUsers.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td><span>{item.firstName}</span>&nbsp;{item.lastName}</td>
                                                    <td>{item.gender === 'F' ? 'nữ' : item.gender === 'M' ? 'nam' : 'khác'}</td>
                                                    <td>{item.phoneNumber}</td>
                                                    <td>{item.roleId}</td>
                                                    <td>{item.address}</td>
                                                    <td>
                                                        <button onClick={() => this.hanldeEditUser(item)} className='mb-1'><i className='fas fa-pencil-alt'></i></button>
                                                        <button onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Container>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
