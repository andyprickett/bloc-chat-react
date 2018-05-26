import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
      activeRoom: null,
      user: null
    };

    this.selectRoom = this.selectRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  selectRoom(room) {
    this.setState(
      { activeRoom: room }
    );
  }

  setUser(user) {
    this.setState(
      { user: user }
    );
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <section className="user">
            <User firebase={firebase} setUser={this.setUser} user={this.state.user} />
          </section>
          <section className="title">
            <h1 className="App-title">Bloc Chat</h1>
          </section>
        </header>
        <main>
          <section className="room-list">
            <RoomList firebase={firebase} selectRoom={this.selectRoom} />
          </section>
          <section className="message-list">
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
