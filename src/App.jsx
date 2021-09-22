/** @jsxRuntime classic /
/* @jsx jsx */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useEffect, useState, createRef } from 'react';
import firebase from 'firebase';
import { app } from './components/FirebaseTools/firebase.config';
import LoginScreen from './components/FirebaseTools/LoginScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import TodoApp from './components/TodoApp';
import readDataFromFirebase from './components/FirebaseTools/readDataFromFirebase';
import { Button } from '@mui/material';
import ServiceSystemToast, {
  increaseValue,
  appendToast,
  removeToast,
  getToast,
} from './ServiceSystemToast';
import React from 'react';

function App() {
  const [currentUid, setCurrentUid] = useState('');
  const [dataFromFirebase, setDataFromFirebase] = useState([]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(!!firebase.auth().currentUser);
        setCurrentUid(firebase?.auth()?.currentUser?.uid);
        readDataFromFirebase(
          firebase.auth().currentUser?.uid,
          setDataFromFirebase
        );
      }
    });
  }, []);

  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <ServiceSystemToast />
      <button onClick={() => appendToast()}>add</button>
      <button onClick={() => removeToast()}>del</button>
      <button onClick={() => getToast()}>get</button>
      <Switch>
        <Route path="/todos">
          {isLogin ? (
            <TodoApp
              currentUid={currentUid}
              dataFromFirebase={dataFromFirebase}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login">
          {isLogin ? <Redirect to="/todos" /> : <LoginScreen />}
        </Route>

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
