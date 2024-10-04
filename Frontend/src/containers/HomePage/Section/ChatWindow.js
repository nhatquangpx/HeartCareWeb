import React, { Component } from 'react';
import chatIcon from '../../../assets/chat_icon.png';
import './ChatWindow.scss';

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChatOpen: false
        };
    }

    toggleChatWindow = () => {
        this.setState({ isChatOpen: !this.state.isChatOpen });
    }

    render() {
        return (
            <div>
                <button className='sticky-button' onClick={this.toggleChatWindow}>
                    <img src= {chatIcon} alt='Chat Icon' />
                </button>
                <div className={`chat-window ${this.state.isChatOpen ? 'active' : ''}`}>
                    <div className='tail'></div>
                    <p>Mọi thắc mắc vui lòng liên hệ tư vấn viên Duy Đông</p>
                    <a href='https://zalo.me/0378567286' target='_blank' rel='noopener noreferrer'>
                        Chat với chúng tôi
                    </a>
                    {/* target= '_blank' - mở liên kết trong 1 tab mới
                        rel='noopener noreferrer' - bảo mật để tránh các cuộc tấn công từ trang mới đến trang gốc */}
                </div>
            </div>
        );
    }
}

export default ChatWindow;