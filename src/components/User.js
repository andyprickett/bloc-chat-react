import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.signInAnonymously = this.signInAnonymously.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signInAnonymously() {
    this.props.firebase.auth().signInAnonymously();
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    const { user } = this.props;
    const guest = 'Anonymous User';
    const anonymousPhoto = 'http://fillmurray.com/200/200'


    return (

      <div>
      { user
        ?
          (
            <div className="signed-in-user">
              <img className="user-photo" src={user.photoURL || anonymousPhoto} alt={`${user.displayName || guest}`}/>
              <p className="user-display-name">{user.displayName || guest}</p>
              <button className="sign-in-button" onClick={this.signOut}>Sign Out</button>
            </div>
          )
        :
          (
            <div className="signed-out-user">
              <img className="user-photo" src={anonymousPhoto} alt={`Not signed in.`}/>
              <button className="sign-in-button" onClick={this.signIn}>Sign In with Google</button>
              <button className="sign-in-button" onClick={this.signInAnonymously}>Sign In Anonymously</button>
            </div>
          )
      }
      </div>
    )
  }
}

export default User;
