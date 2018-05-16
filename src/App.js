import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBE4BGpM8jFxLTK8napF6am6WHfFVXlKWg",
  authDomain: "bloc-chat-react-a1c93.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-a1c93.firebaseio.com",
  projectId: "bloc-chat-react-a1c93",
  storageBucket: "bloc-chat-react-a1c93.appspot.com",
  messagingSenderId: "366754758894"
};
firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeRoom: undefined
    };

    this.selectRoom = this.selectRoom.bind(this);
  }

  selectRoom(room) {
    this.setState(
      { activeRoom: room }
    );
    console.log(this.state.activeRoom)
  }

  dummy(){
    console.log('weeeeee')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <main>
          <section className="room-list">
            <RoomList firebase={firebase} selectRoom={this.selectRoom} dummy={this.dummy} />
          </section>
          <section className="message-list">
            <MessageList firebase={firebase}
                         activeRoom={this.state.activeRoom}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
