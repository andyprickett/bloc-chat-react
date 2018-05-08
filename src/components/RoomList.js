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
        { rooms: this.state.rooms.concat( snapshot.val() ) }
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
      <div>
        {
          this.state.rooms.map(
            (room, index) => <h1 key={index}>{room.name}</h1>
          )
        }
        <form className="create-room" onSubmit={this.createRoom}>
          <label>
            <span>Create a New Room: </span>
            <input type="text"
                   value={this.state.newRoomName}
                   onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Go!" />
        </form>
      </div>
    );
  }
}

export default RoomList;
