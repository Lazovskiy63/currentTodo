/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import LoginScreen from './components/FirebaseTools/LoginScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import TodoApp from './components/TodoApp';
import readDataFromFirebase from './components/FirebaseTools/readDataFromFirebase';
import ServiceSystemToast, {
  appendToast,
  removeToast,
  getToast,
  TOAST_TYPE,
} from './ServiceSystemToast';
import { app } from './/components/FirebaseTools/firebase.config';
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
      <button
        onClick={() =>
          appendToast('ERROR', 'Todos did not loaded', TOAST_TYPE.ALERT)
        }
      >
        add
      </button>
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
