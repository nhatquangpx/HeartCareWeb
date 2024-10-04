import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class HandBook extends Component {


    render() {

        return (
            <div className="section-share section-handBook">
                <div className="section-container">
                    <div className="section-header">
                        <span>Cẩm nang</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className='slider-customize'>
                                <div className='slider-handbook'>
                                <div className='slider-wrapper wrapper-handbook'>
                                    <div className="bg-image img-handBook1"></div>
                                    <div className='text'>Cẩm nang 1</div>
                                </div>
                                <div className='slider-wrapper wrapper-handbook'>
                                    <div className="bg-image img-handBook2"></div>
                                    <div className='text'>Cẩm nang 2</div>
                                </div>
                                </div>
                            </div>  
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
