import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

import firebaseConfig from './config/firebase';
firebase.initializeApp(firebaseConfig);

class App extends Component {
  vote = () => {
    const db = firebase.firestore();
    db.collection('vote')
      .doc('target_1')
      .collection('votes')
      .add({
        voted_at: Date.now()
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .then(error => {
        console.error('Error writing document: ', error);
      });
    // db.collection('vote').add({
    //   first: 'Ada',
    //   last: 'Lovelace',
    //   born: 1815
    // });
  };

  componentDidMount() {
    // firebaseイベントをリッスン
    firebase.auth().onAuthStateChanged(user => {
      if (!user) return;
      console.log(user.uid);
    });

    // ログイン実行
    firebase
      .auth()
      .signInAnonymously()
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <Root>
        <Button variant="contained" color="primary" onClick={this.vote}>
          VOTE
        </Button>
      </Root>
    );
  }
}

export default App;

const Root = styled.div`
  padding: 30px;
`;
