import React, {Component} from 'react';
import avatar from '../images/mouse.jpg';
// import Message from './msg';


export default class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      inputMsg: '', //single msg
      
    }
    this._onResize = this._onResize.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTestMessages = this.addTestMessages.bind(this);
    
  }

  _onResize() {
    this.setState({
      height: window.innerHeight,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize);
    
  }
 

  addTestMessages() {
    
    let msg = this.state.inputMsg;

    this.setState({
      inputMsg: '',
    });

    this.props.addTextMsg(this.props.myName, msg);

  }


  handleChange(e) {
    let text = e.target.value;

    this.setState({
      inputMsg: text,
    });

  }


  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  renderChat = (usr_data) => (
    <div className="usr-channel" onClick={() => this.props.setChatUser(usr_data)} >
      <div className="channel-body" >
        <div className="channel-usr">
        <h5>{usr_data}</h5>
        </div>
      </div>
    </div>
  );

  renderMsg = (d) => (
    <div className={`${(this.props.myName===d.author) ? 'my' : 'ur'}-message`}>
    <div className="msg-body">
      <div className="msg-author">{d.author}</div>
      <div className={`msg-txt ${(this.props.myName===d.author) ? 'my' : 'ur'}`}>{d.text}</div>
    </div>
  </div>    
  )

  render() {
    const style={
      height: this.state.height,
    }
  
    return (
      <div style={style} className="app-messenger">
        <div className="header">
          <div className="header-content">
            <h2>{this.props.myName}</h2>
          </div>
        </div>

        <div className="main">
          <div className="sidebar-left">
          {
            Object.keys(this.props.database).filter(k=>k.includes(this.props.myName))
                    .map(d => this.renderChat(d.replace(this.props.myName, "").replace(":","")))
          }
          </div>
          <div className="content">
            <div className="messages">
              {
                this.props.database[this.props.curChatRoom].map(d => this.renderMsg(d))
              }

            </div>
            <div className="input-place">
              <textarea className="input-msg" placeholder="type something..." value={this.state.inputMsg} onChange={this.handleChange}></textarea>
              <button className="send-btn" onClick={this.addTestMessages}>送出</button>
            </div>
          </div>
    
        </div>
      </div>
    )
  }
}