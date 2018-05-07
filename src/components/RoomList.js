import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      this.setState(
        { rooms: this.state.rooms.concat( snapshot.val() ) }
      );
    });
  }

  render() {
    return (
      <div>
        {
          this.state.rooms.map(
            (room, index) => <h1 key={index}>{room.name}</h1>
          )
        }
      </div>
    );
  }
}

export default RoomList;
