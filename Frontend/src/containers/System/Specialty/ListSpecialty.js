import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ListSpecialty.scss';
import { getAllSpecialty, deleteSpecialtyById } from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'reactstrap';


class ListSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
        }
    }

    async componentDidMount() {
        this.fetchSpecialtys()
    }

    fetchSpecialtys = async () => {
        let res = await getAllSpecialty();
        if (res.errCode === 0 && res.data) {
            this.setState({
                specialties: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        this.fetchSpecialtys();
    }

    handleDeleteSpecialty = async (id) => {
        let confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa 'Chuyên khoa' với ID '" + id + "' không?");

        if (confirmDelete) {
            try {
                await deleteSpecialtyById(id);
                this.fetchSpecialtys(); // Cập nhật danh sách specialties sau khi xóa
                toast.success('Specialty deleted successfully!')
            } catch (error) {
                toast.error('Error deleted!')
            }
        }
    }

    render() {
        const { specialties } = this.state;

        return (
            <Container>
                <h3 className="title">List Specialty</h3>
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th colSpan={2}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {specialties.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>
                                    {item.image && (
                                        <img className='img' src={item.image} alt={item.name} />
                                    )}
                                </td>
                                <td className='flex'>
                                    {/* <button onClick={() => this.idFromParient(item)} className="btn-edit">
                                        <i className="fas fa-edit"></i>
                                    </button> */}
                                    <button onClick={() => this.handleDeleteSpecialty(item.id)} className="btn-delete">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allRequireDoctorInfor: state.admin.allRequireDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);
