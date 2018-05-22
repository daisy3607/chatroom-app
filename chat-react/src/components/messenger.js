import React, {Component} from 'react';
import my_img from '../images/me.jpg';
import your_img from '../images/mouse.jpg';
import Message from './msg';
import ContactRoom from './contact';

export default class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      inputMsg: [], //single msg
      
    }
    this._onResize = this._onResize.bind(this);
    this.addTestMessages = this.addTestMessages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setChatUser = this.setChatUser.bind(this);
    
  }

  _onResize() {
    this.setState({
      height: window.innerHeight,
    });
  }

  setChatUser(id) {
    console.log(id);
    this.props.setChatUser(id);
  }

  
  componentDidMount() {
    window.addEventListener('resize', this._onResize);
    
  }
 
  addTestMessages() {
    let text = this.state.inputMsg;
    this.props.addTextMsg(text);
    this.setState({
      inputMsg: '',
    });
  }

  handleChange(e) {
    let text = e.target.value;
    this.setState({inputMsg: text});
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  render() {
    const style={
      height: this.state.height,
    }
  
    return (
      <div style={style} className="app-messenger">
        <div className="header">
          <div className="header-left">
            <button className="new-msg">New Message</button>
          </div>

          <div className="header-content">
            <h2>{this.props.curChannel.userName}</h2>
          </div>
        </div>

        <div className="main">
          <div className="sidebar-left">
          {
            
            this.props.userList.map((user_data, index) => {
              return <ContactRoom userId={index}
                                  userName={user_data.userName}
                                  setChatUser={this.setChatUser} />
            }
          )}
          </div>
          <div className="content">
            <div className="messages">
              {
                this.props.curChannel.Messages.map((message_data => {
                  return <Message content={message_data.msg} author={message_data.author}
                                  authorIsMe={message_data.authorIsMe} />
                })
              )}
            </div>
            <div className="input-place">
              <textarea className="input-msg" placeholder="type something..." value={this.state.inputMsg}  onChange={this.handleChange}></textarea>
              <button className="send-btn" onClick={this.addTestMessages}>送出</button>
            </div>
          </div>
    
        </div>
      </div>
    )
  }
}