import React, {Component} from 'react';
import './login.css';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(id) {
    this.props.handleLogIn(id);
  }

  render() {
    return (
      <div className = "UserListContainer">
        
        <ul>
          <li><button className="UserWrapper" onClick={()=>this.handleLogIn(0)}>倉鼠-薯泥</button></li>
          <li><button className="UserWrapper" onClick={()=>this.handleLogIn(1)}>肥宅</button></li>
          <li><button className="UserWrapper" onClick={()=>this.handleLogIn(2)}>媽媽</button></li>
          <li><button className="UserWrapper" onClick={()=>this.handleLogIn(3)}>大眼妹</button></li>
        </ul>
      </div>
    )
  }



}