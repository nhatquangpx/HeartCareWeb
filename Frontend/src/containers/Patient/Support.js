import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import HomeHeader from '../HomePage/HomeHeader';

class Support extends Component {
    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://sp.zalo.me/plugins/sdk.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.zalo) {
                window.zalo.onLoad(() => {
                    window.zalo.openChat();
                });
            }
        };
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Hỗ trợ</title>
                </Helmet>
                <HomeHeader />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    Hãy bấm vào nút chat bên dưới để nhận được hỗ trợ từ BookingCare Chatbot
                </div>
                <div
                    className="zalo-chat-widget"
                    data-oaid="1417344681825631378"
                    data-welcome-message="Rất vui khi được hỗ trợ bạn!"
                    data-autopopup="0"
                    data-width=""
                    data-height=""
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
