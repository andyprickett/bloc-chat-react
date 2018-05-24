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
      <div className="messages-container">

        <header className="messages-header">
          <h2>{activeRoomName}</h2>
        </header>

        <section className="messages">
          <ul className="messages-list">
            { activeRoom &&
              messages.map((message, index) => {
                return <li key={message.key} className="message">{message.val().content}</li>;
              })
            }
          </ul>
        </section>

      </div>
    );
  }
}

export default MessageList;
