import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Slider from './Section/Slider';
import Service from './Section/Service';
import Speciality from './Section/Speciality';
// import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './Section/HomeFooter';
import ChatWindow from './Section/ChatWindow';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import CustomArrow from './Section/CustomArrow';

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        };
        let doctorsettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        return (
            <div>
                <div className='Header'>
                    <HomeHeader isShowBanner={true} />
                </div>
                <div className='Content'>
                    <Slider/>
                    <Service/>
                    <Speciality settings={settings} />
                    {/* <MedicalFacility settings={settings} /> */}
                    <OutStandingDoctor settings={doctorsettings} />
                    <HandBook settings={settings} />
                    <About settings={settings} />
                    <ChatWindow/>
                </div>
                <div className='Footer'>
                    <HomeFooter />
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
