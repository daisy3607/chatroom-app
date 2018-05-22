import React, {Component} from 'react';
import Messenger from './messenger';
import Login from './login';
import io from 'socket.io-client';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 1,
      Me: 0,
      socket: io('http://localhost:4000'),
      userList: [
        { 
          userName: '倉鼠-薯泥',
          Messages: [
            // { msg: '我要吃葵花子', author: '薯泥', authorIsMe: 0 },
            // { msg: '我要吃葵花子', author: '薯泥', authorIsMe: 0 },
            // { msg: '我要吃葵花子', author: '薯泥', authorIsMe: 0},
          ],
        },
        {

          userName: '肥宅', 
          Messages: [
            // { msg: 'HI', author: '肥宅', authorIsMe: 0 },
            // { msg: '吃飯沒', author: '肥宅', authorIsMe: 0 },
          ],
        },
        {

          userName: '媽媽', 
          Messages: [
            // { msg: 'HI', author: '媽媽', authorIsMe: 0 },
            // { msg: '吃飯沒', author: '媽媽', authorIsMe: 0 },
          ],
        },
        {
          
          userName: '大眼妹', 
          Messages: [
            // { msg: 'HI', author: '大眼妹', authorIsMe: 0 },
            // { msg: '吃飯沒', author: '大眼妹', authorIsMe: 0 },
          ],
        },
      ],
      curChannel: 0,

    };
    this.handleLogIn = this.handleLogIn.bind(this); // set my view
    this.setChatUser = this.setChatUser.bind(this); // set who could I chat with
    this.addTextMsg = this.addTextMsg.bind(this);
    
  }

  componentDidMount() {
    this.callApi()
        .then(res => this.setState({ response: res.userList }))
        .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/');    
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
    var userList = this.state.userList;
    this.state.socket.emit('login', {myName: userList.userName});
    var myChatList = userList.filter((user,index) => index !== id);
    
    this.setState({
      login: 0,
      Me: id,
      userList: myChatList,
    })
    
  }


  addTextMsg(text) {
    let curUserMsgList = this.state.userList[this.state.curChannel].Messages;
    curUserMsgList.push({ msg: text, author: 'Daisy', authorIsMe: 1});
    let id = this.state.curChannel;
    // console.log(curUserMsgList);
    this.setState({
      curUserMsgList:  curUserMsgList,
    })
  }
  
  render() {
    
    return (
      <div className="app-wrapper">
        {(this.state.login)? <Login handleLogIn={this.handleLogIn} />: 
          (
            <Messenger setChatUser={this.setChatUser} userList={this.state.userList}
                      curChannel={this.state.userList[this.state.curChannel]} 
                      addTextMsg={this.addTextMsg}  />
          )}
      </div>
    )
  }
}
