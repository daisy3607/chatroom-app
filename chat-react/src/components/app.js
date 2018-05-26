import React, {Component} from 'react';
import Messenger from './messenger';
import Login from './login';
import io from 'socket.io-client';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://localhost:8888'),
      renderLogin: 1,
      myName: '',
      database: '', 
      curChatUser: '', // "肥宅"
      curChatRoom: '', // "鼠妮:肥宅"
      alert: {'薯泥': 0, '肥宅': 0, '媽媽': 0, '大眼妹': 0},
    };

    
    this.handleLogIn = this.handleLogIn.bind(this);
    // this.filterFrdList = this.filterFrdList.bind(this);
    this.setChatUser = this.setChatUser.bind(this);
    this.addTextMsg = this.addTextMsg.bind(this);
  }

  componentDidMount() {

    this.callApi()
      .then(res => this.setState({ database: res.data }))
      .catch(err => console.log(err));

    this.state.socket.on('realtime chatting', this.handleNewMsg);  

  }
    
  handleNewMsg = (author, authorRoom, msg) => {
    
    this.setState({
      database: {...this.state.database, [authorRoom]: [ ...this.state.database[authorRoom], msg]},
      alert: {...this.state.alert, [author]: 1}
    })

  }



  callApi = async () => {
    const response = await fetch('/data');    
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  handleLogIn(myName) {
    this.state.socket.emit('login', myName);
    const targetRoom = Object.keys(this.state.database).filter(key => key.includes(myName));
    
    

    this.setState({
      renderLogin: 0,
      myName: myName,
      curChatRoom: targetRoom[0],
      curChatUser: targetRoom[0].replace(myName, "").replace(":",""),
    })

    
  }


  setChatUser(curUsr) {
 
    const Keys = Object.keys(this.state.database);
    const roomName = Keys.includes(`${curUsr}:${this.state.myName}`) ? `${curUsr}:${this.state.myName}` : `${this.state.myName}:${curUsr}`;
    

    this.setState({
      curChatRoom: roomName,
      curChatUser: roomName.replace(this.state.myName,"").replace(":",""),
      alert: {...this.state.alert, [curUsr]: 0}
    })    

  }

  addTextMsg(author, msg) {
    
    // create msg array
    let newMsg = {author:author, text: msg};
    const curUser = this.state.curChatRoom;

    this.setState({
      database: {...this.state.database, [curUser]: [ ...this.state.database[curUser], newMsg]},
    })
    
    
    // refiltered
    this.state.socket.emit('add msg', this.state.curChatRoom, this.state.curChatUser, newMsg);
  }


  render() {
    return (
      <div className="app-wrapper">
        {(this.state.renderLogin)? <Login handleLogIn={this.handleLogIn} 
                                          socket={this.state.socket}/>: 
          (
            <Messenger myName={this.state.myName} database={this.state.database} 
                       setChatUser={this.setChatUser} alert={this.state.alert} curChatUser={this.state.curChatUser}
                       curChatRoom={this.state.curChatRoom} addTextMsg={this.addTextMsg} />
          )}
      </div>
    )
  }
}
