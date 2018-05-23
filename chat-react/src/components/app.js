import React, {Component} from 'react';
import Messenger from './messenger';
import Login from './login';
import io from 'socket.io-client';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 1,
      Me: '',
      socket: io('http://localhost:8888'),
      userList: [{ 
        userName: '倉鼠-薯泥',
        Messages: [],
        newsAlert: 0,
      },
      {
        userName: '肥宅', 
        Messages: [],
        newsAlert: 0,
      },
      {
  
        userName: '媽媽', 
        Messages: [],
        newsAlert: 0,
      },
      {
        
        userName: '大眼妹', 
        Messages: [],
        newsAlert: 0,
      },
    ],
      curChannel: 0,
      msg_data:'', // total database
      msg_record: '', // records for current user
      newMsg: [],

    };
    this.handleLogIn = this.handleLogIn.bind(this); // set my view
    this.setChatUser = this.setChatUser.bind(this); // set who could I chat with
    this.addTextMsg = this.addTextMsg.bind(this);
    this.renderMsgRecord = this.renderMsgRecord.bind(this);
    
  }

  componentDidMount() {
    
    this.callApi()
      .then(res => this.setState({ msg_data: res.data }))
      .catch(err => console.log(err));

    
    this.state.socket.on('realtime chatting', this.handleNewMsg);  
  }
  
  handleNewMsg = (usr, msg) => {
    
    let curUserMsgList = this.state.userList;
    curUserMsgList[this.state.curChannel].Messages.push({ msg: msg, author: usr, authorIsMe: 0});
    
    console.log(curUserMsgList);
    console.log(this.state);
    // this.forceUpdate();
    // // this.setState({
    // //   userList:  curUserMsgList,
    // // });
  }

  callApi = async () => {
    const response = await fetch('/data');    
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  }


  setChatUser(id) {
    let curUserId = this.state.curChannel;
    
    if (curUserId !== id) {
      this.setState({
        curChannel: id,
      });
    }
    
  }

  handleLogIn(id) {
    // fetch data
    const userList = this.state.userList;
    const me_name = userList[id].userName;
    const myChatList = userList.filter((user,index) => index !== id);
    
    this.state.socket.emit('login', {myName: me_name, myId: id, chatRoom: myChatList});
    
    this.setState({
      login: 0,
      Me: me_name,
      userList: myChatList,
      // curChannel: myChatList[0].index,
    })
    this.renderMsgRecord(me_name);
  }


  renderMsgRecord(myName) {
    // { msg: 'HI', author: '媽媽', authorIsMe: 0 },
    
    const chat_data = this.state.msg_data;

    // find current user's all chatrooms
    const chat_usrs = (chat_data).filter(d => d.user[0] === myName || d.user[1] === myName);
    this.setState({
      msg_record: chat_usrs,
    }) 

  }

  addTextMsg(text) {
    
    let curUserMsgList = this.state.userList[this.state.curChannel].Messages;
    curUserMsgList.push({ msg: text, author: this.state.Me, authorIsMe: 1});
    let id = this.state.curChannel;
    // console.log(curUserMsgList);
    // this.setState({
    //   curUserMsgList:  curUserMsgList,
    // });
    this.state.socket.emit('add msg',this.state.Me ,this.state.userList[id].userName ,text);

  }


  render() {
    return (
      <div className="app-wrapper">
        {(this.state.login)? <Login handleLogIn={this.handleLogIn} />: 
          (
            <Messenger msgRecord={this.state.msg_record[this.state.curChannel]}
                      addNewMsg={this.state.newMsg}
                      setChatUser={this.setChatUser} userList={this.state.userList}
                      curChannel={this.state.userList[this.state.curChannel]} 
                      addTextMsg={this.addTextMsg}  />
          )}
      </div>
    )
  }
}
