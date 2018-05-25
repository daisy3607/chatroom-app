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
        <div className = "ListWrapper">
          <h3> L O G I N </h3>
          <ul>
            <li><button className="UserWrapper" onClick={()=>this.handleLogIn('薯泥')}><span>薯泥</span></button></li>
            <li><button className="UserWrapper" onClick={()=>this.handleLogIn('肥宅')}><span>肥宅</span></button></li>
            <li><button className="UserWrapper" onClick={()=>this.handleLogIn('媽媽')}><span>媽媽</span></button></li>
            <li><button className="UserWrapper" onClick={()=>this.handleLogIn('大眼妹')}><span>大眼妹</span></button></li>
          </ul>
          <p className="designer"> designed by Daisy Tsai</p>
        </div>
      </div>
    )
  }



}