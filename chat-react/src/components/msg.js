import React, {Component} from 'react';

import your_img from '../images/mouse.jpg';

export default class Message extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div className={`${this.props.authorIsMe ? 'my' : 'ur'}-message`}>
        <div className="usr-img"><img src={your_img} alt="" /></div>
        <div className="msg-body">
          <div className="msg-author">{this.props.author}</div>
          <div className={`msg-txt ${this.props.authorIsMe ? 'my' : 'ur'}`}>{this.props.content}</div>
        </div>
    </div>
    );

  }
}