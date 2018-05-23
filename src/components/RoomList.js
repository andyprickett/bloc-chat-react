import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      this.setState(
        { rooms: this.state.rooms.concat(snapshot.val()) }
      );
    });
  }

  handleChange(event) {
    let newRoomData = event.target.value;
    this.setState(
      { newRoomName: newRoomData }
    );
  }

  createRoom(event) {
    event.preventDefault();
    this.roomsRef.push(
      { name: this.state.newRoomName }
    );
    this.setState(
      { newRoomName: '' }
    );
  }

  render() {

    return (
      <div className="rooms-container">

        <header className="rooms-header">
          <h2>Chat Rooms</h2>
        </header>

        <form id="create-room-form" onSubmit={this.createRoom}>
          <label id="create-room-label">
            <span id="create-room-prompt">Create a New Room:</span>
            <input id="create-room-field" type="text" value={this.state.newRoomName} onChange={this.handleChange} />
          </label>
          <input id="create-room-button" type="submit" value="Go!" />
        </form>

        <section className="rooms">
          {
            this.state.rooms.map((room, index) => {
              return <h3 className="room" key={index} onClick={() => this.props.selectRoom(room)}>{room.name}</h3>;
            })
          }
        </section>
      </div>
    );
  }
}

export default RoomList;
