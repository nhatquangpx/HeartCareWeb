import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {


    render() {

        return (
            <div className="section-share section-about">
                <div className="section-container">
                    <div className="section-header">
                        <span>Web của chúng tôi có gì</span>
                    </div>
                    <div className="section-body">
                        <div className="section-left">
                        <iframe width="50%" height="320px" src="https://www.youtube.com/embed/rmwlz-9tlOs?si=uscuR1DPEB-3ygHh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
