import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({ dataClinics: res.data ? res.data : [] });
        }
    }

    hanldeViewDetailClinic = (clinicId) => {
        this.props.history.push(`/detail-clinic/${clinicId.id}`)
    }

    render() {
        let { dataClinics } = this.state;

        return (
            <div className="section-share">
                <div className="section-container">
                    <div className="section-header">
                        <span>Cơ sở y tế nổi bật</span>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div className='slider-customize' key={index}
                                            onClick={() => this.hanldeViewDetailClinic(item)}>
                                            <div className="bg-image img-medical-facility"
                                                style={{ backgroundImage: `url(${item.image})` }}>
                                            </div>
                                            <div className='text text-center'>{item.name}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
