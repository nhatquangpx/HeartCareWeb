import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ListClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import commonUtils from '../../../utils/CommonUtils';
import { getAllClinic, deleteClinicById, getDetailClinicById } from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lightbox from 'react-18-image-lightbox'
import { Container } from 'reactstrap';
import AddNewClinic from './AddNewClinic';

const mdParser = new MarkdownIt(/* Thêm các tùy chọn của Markdown-it nếu cần */);

class ListClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
        }
    }

    async componentDidMount() {
        this.fetchClinics()
    }

    fetchClinics = async () => {
        let res = await getAllClinic();
        if (res.errCode === 0 && res.data) {
            this.setState({
                clinics: res.data, // Cập nhật mảng clinics trong state
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        this.fetchClinics();

    }

    handleDeleteClinic = async (clinicId) => {
        let confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa 'Cơ sở YT' với ID '" + clinicId + "' không?");

        if (confirmDelete) {
            try {
                await deleteClinicById(clinicId);
                this.fetchClinics(); // Cập nhật danh sách clinics sau khi xóa
                toast.success('Clinic deleted successfully!')
            } catch (error) {
                toast.error('Error deleted!')
            }
        }
    }

    render() {
        const { clinics } = this.state;

        return (
            <Container>
                <h3 className="title">List Cliniic</h3>
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Image</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinics.map((clinic, index) => (
                            <tr key={clinic.id}>
                                <th scope="row">{clinic.id}</th>
                                <td>{clinic.name}</td>
                                <td>{clinic.address}</td>
                                <td>
                                    {clinic.image && (
                                        <img className='img' src={clinic.image} alt={clinic.name} />
                                    )}
                                </td>
                                <td className='flex'>
                                    {/* <button onClick={() => this.idFromParient(clinic)} className="btn-edit">
                                        <i className="fas fa-edit"></i>
                                    </button> */}
                                    <button onClick={() => this.handleDeleteClinic(clinic.id)} className="btn-delete">
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

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
