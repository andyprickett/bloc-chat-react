import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componenetDidMount() {
    this.roomRef.on('child_added', snapshot => {
      console.log('hello');
    });
  }

  render() {
    return(
      <h1>roomlist</h1>
    );
  }
}

export default RoomList;
