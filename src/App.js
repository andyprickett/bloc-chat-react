import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
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

          <div className="room-column">

            <div className="room-column-container">
              <section className="room-list">
                <RoomList firebase={firebase}
                          selectRoom={this.selectRoom}
                />
              </section>
            </div>

          </div>

          <div className="message-column">

            <div className="message-column-container">
              <section className="message-list">
                <MessageList firebase={firebase}
                             activeRoom={this.state.activeRoom}
                />
              </section>
              <section className="message-input">
                <MessageInput firebase={firebase}
                              activeRoom={this.state.activeRoom}
                              user={this.state.user}
                />
              </section>
            </div>

          </div>
        </main>
      </div>
    );
  }
}

export default App;
