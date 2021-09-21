import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDpdU5x-kJEHWPLYK35ezveqWmhpPwX99w',
  authDomain: 'todo-5d053.firebaseapp.com',
  databaseURL: 'https://todo-5d053-default-rtdb.firebaseio.com',
  projectId: 'todo-5d053',
  storageBucket: 'todo-5d053.appspot.com',
  messagingSenderId: '460979985760',
  appId: '1:460979985760:web:e10cfb52da7bb17d5ad205',
};

export const app = firebase.initializeApp(firebaseConfig);
