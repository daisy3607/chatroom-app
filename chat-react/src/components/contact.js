import React, {Component} from 'react';
import '../css/app.css';

export default class ContactRoom extends Component {
    constructor(props) {
      super(props);

    } 
    

    render() {
      return (
        <div className="usr-channel" onClick={()=>this.props.setChatUser(`${this.props.userId}`)}>
        <div className="channel-body">
          <div className="channel-usr"><h5>{this.props.userName}</h5></div>
          
        </div>
      </div>
      )
    }

}