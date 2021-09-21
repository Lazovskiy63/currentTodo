/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
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

function App() {
  const [currentUid, setCurrentUid] = useState(null);
  const [dataFromFirebase, setDataFromFirebase] = useState([]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(!!firebase.auth().currentUser);
        setCurrentUid(firebase.auth().currentUser.uid);
        readDataFromFirebase(
          firebase.auth().currentUser.uid,
          setDataFromFirebase
        );
      }
    });
  }, []);

  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <Route></Route>

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

        <Route exact pah="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
