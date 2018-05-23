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
        { messages: this.state.messages.concat( snapshot.val() ) }
      );
    });
  }

  render() {
    var messages = this.state.messages.filter(message => message.roomId === this.props.activeRoom.name);

    return (
      <div className="messages-container">

        <header className="messages-header">
          <h2>{this.props.activeRoom !== '' ? `Messages for ${this.props.activeRoom.name}` : 'Messages'}</h2>
        </header>

        <section className="messages">
          <ul className="messages-list">
            {
              messages.map((message, index) => {
                return <li key={index} className="message">{message.content}</li>;
              })
            }
          </ul>
        </section>

      </div>
    );
  }
}

export default MessageList;
