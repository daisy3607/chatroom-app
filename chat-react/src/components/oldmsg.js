import React, {Component} from 'react';

import your_img from '../images/mouse.jpg';

export default class OldMessage extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div className={`${this.props.authorIsMe ? 'my' : 'ur'}-message`}>
        
        <div className="msg-body">
          <div className="msg-author">{this.props.author}</div>
          <div className={`msg-txt ${this.props.authorIsMe ? 'my' : 'ur'}`}>{this.props.content}</div>
        </div>
    </div>
    );

  }
}