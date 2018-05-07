import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
          <nav>
            <h2>Room List</h2>
          </nav>
        </header>
        <main>
          <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}

export default App;
