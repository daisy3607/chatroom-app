import React, {Component} from 'react';
import './login.css';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.state = {
      onlineUser: [],
    }
  }

  handleLogIn(name) {
    this.props.handleLogIn(name);
  }


  render() {
    return (
      <div className = "UserListContainer">
        <h3> Please select your identity </h3>
        <ul>
          <li><button className="UserWrapper" onClick={()=>this.handleLogIn('薯泥')}>薯泥</button></li>
          <li><button className="UserWrapper" onClick={()=>this.handleLogIn('肥宅')}>肥宅</button></li>
          <li><button className="UserWrapper" onClick={()=>this.handleLogIn('媽媽')}>媽媽</button></li>
          <li><button className="UserWrapper" onClick={()=>this.handleLogIn('大眼妹')}>大眼妹</button></li>
        </ul>
      </div>
    )
  }



}