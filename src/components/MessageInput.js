import React, { Component } from 'react';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: ''
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.placeHolder = this.placeHolder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.activeRoom){
      this.setState(
        { newMessage: '' }
      );
    }
  }

  placeHolder(user, room) {
    return (
      !user
      ? 'Log in to write a message...'
      : room
      ? 'Write a new message in this room...'
      : 'Select a room to write a message in...'
    )
  }

  handleChange(event) {
    let newMessageData = event.target.value;
    this.setState(
      {
        newMessage: newMessageData,
      }
    );
  }

  createMessage(event) {
    event.preventDefault();
    if (this.props.user && this.props.activeRoom) {
      const userName = this.props.user.displayName || 'Anonymous User';
      const timeStamp = this.props.firebase.database.ServerValue.TIMESTAMP;
      const roomId = this.props.activeRoom.val().name;

      this.messagesRef.push(
        {
          content: this.state.newMessage,
          username: userName,
          sentAt: timeStamp,
          roomId: roomId
        }
      );
      this.setState(
        { newMessage: '' }
      );
    }
  }

  render() {

    return (
      <div className="message-input-container">

        <form id="create-message-form" onSubmit={this.createMessage}>
          <input id="create-message-field"
                 type="text"
                 required
                 placeholder={this.placeHolder(this.props.user, this.props.activeRoom)}
                 value={this.props.user ? this.state.newMessage : ''}
                 onChange={this.handleChange}
          />
          {
            (this.props.user && this.props.activeRoom) &&
            <button id="create-message-button" type="button">
              Send
            </button>
          }
        </form>

      </div>
    );
  }
}

export default MessageInput;
