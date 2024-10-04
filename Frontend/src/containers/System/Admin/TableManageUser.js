import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        console.log(user);
        this.props.handleEditUserFromParent(user);
    }

    render() {
        let arrUsers = this.state.userRedux;
        return (
            <>
                <Container>
                    <div className="user-table mt-2">
                        <table class="table table-bordered table-hover">
                            <thead className='table-success'>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Title</th>
                                    <th>Address</th>
                                    <th colSpan={2}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrUsers && arrUsers.length > 0 &&
                                    arrUsers.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td><span>{item.lastName}</span>&nbsp;{item.firstName}</td>
                                                <td>{item.gender === 'F' ? 'nữ' : item.gender === 'M' ? 'nam' : 'khác'}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.roleId === 'role_admin' ? 'admin' : item.roleId === 'role_doctor' ? 'bác sĩ' : 'bệnh nhân'}</td>
                                                <td>{item.positionId === 'P0' ? 'bác sĩ' : item.positionId === 'P1' ? 'thạc sĩ'
                                                    : item.positionId === 'P2' ? 'tiến sĩ'
                                                        : item.positionId === 'P3' ? 'phó giáo sư' : item.positionId === 'P4' ? 'giáo sư' : 'bệnh nhân'}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button onClick={() => this.handleEditUser(item)} className='mb-1'><i className='fas fa-pencil-alt'></i></button>
                                                    <button onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>

                </Container>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
