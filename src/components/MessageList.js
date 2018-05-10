import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      this.setState(
        { messages: this.state.messages.concat( snapshot.val() ) }
      );
    });
  }

  render() {
    return (
      <div className="messages-container">

        <header className="messages-header">
          <h2>{this.props.activeRoom}</h2>
        </header>

        <section className="messages">
          {
            this.state.messages.map(
              (message, index) => <h3 key={index} className="message">{message.name}</h3>
            )
          }
        </section>

      </div>
    );
  }
}

export default MessageList;
