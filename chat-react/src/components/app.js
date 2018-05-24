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
    
  handleNewMsg = (msg) => {
    const curUser = this.state.curChatRoom;
    
    console.log(msg);
    this.setState({
      database: {...this.state.database, [curUser]: [ ...this.state.database[curUser], msg]},
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

    
    // const curRoom = roomName.filter(n => n.includes(curUsr));
    this.setState({
      curChatRoom: roomName,
      curChatUser: roomName.replace(this.state.myName,"").replace(":",""),
    })
    console.log(curUsr);
    
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
        {(this.state.renderLogin)? <Login handleLogIn={this.handleLogIn} />: 
          (
            <Messenger myName={this.state.myName} database={this.state.database} 
                       setChatUser={this.setChatUser} 
                       curChatRoom={this.state.curChatRoom} addTextMsg={this.addTextMsg} />
          )}
      </div>
    )
  }
}
