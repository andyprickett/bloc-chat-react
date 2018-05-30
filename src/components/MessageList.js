import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      this.setState(
        { messages: this.state.messages.concat( snapshot ) }
      );
    });
  }

  convertTime(timeStamp) {
    const timeString = timeStamp.toString().substring(0,10);
    const date = new Date(timeString * 1000);
    let time = [ date.getHours(), date.getMinutes() ];
    let suffix = time[0] < 12 ? "AM" : "PM";
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;
    for ( let i = 1; i < 3; i++ ) {
      if ( time[i] < 10) {
        time[i] = "0" + time[i];
      }
    }
    
    return `${time[0]}:${time[1]} ${suffix}`;
  }

  render() {
    const { activeRoom } = this.props;
    var activeRoomName, messages;

    if (activeRoom) {
      activeRoomName = 'Messages: ' + activeRoom.val().name;
      messages = this.state.messages.filter(message => message.val().roomId === activeRoom.val().name);
    } else {
      activeRoomName = 'Messages';
    }

    return (
      <div className="message-list-container">

        <header className="message-list-header">
          <h2>{activeRoomName}</h2>
        </header>

        <section className="messages">
          <ul className="messages-list">
            { activeRoom &&
              messages.map((message, index) => {
                return (
                  <li key={message.key}
                      className="message">
                    <div className="message-info">
                      <span className="message-userName">{message.val().username}</span>
                      <span className="message-timeStamp">{this.convertTime(message.val().sentAt)}</span>
                    </div>
                    <p className="message-content">{message.val().content}</p>
                  </li>
                );
              })
            }
          </ul>
        </section>
      </div>
    );
  }
}

export default MessageList;
