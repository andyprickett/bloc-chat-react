import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.messagesRef= this.props.firebase.database()
                                         .ref('messages')
                                         .orderByChild('roomId')
                                         .equalTo('Room 1')
                                         ;
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      this.setState(
        { messages: this.state.messages.concat( snapshot.val() ) }
      );
    });
  }

  render() {

    const { activeRoom } = this.props;

    return (

      <div className="messages-container">

        <header className="messages-header">
          <h2>{activeRoom}</h2>
        </header>

        <section className="messages">
          <ul>
            {
              this.state.messages.map(
                (message, index) => {
                  return <li key={index} className="message">message</li>
                }
              )
            }
          </ul>
        </section>

      </div>
    );
  }
}

export default MessageList;
