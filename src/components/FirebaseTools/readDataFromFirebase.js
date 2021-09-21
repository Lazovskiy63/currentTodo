import firebase from 'firebase';
const readDataFromFirebase = (uid, setDataFromFirebaseFromTodoApp) => {
  var db = firebase.database().ref('users/' + uid);
  db.on('value', (snapshot) => {
    const data = snapshot.val();
    setDataFromFirebaseFromTodoApp(data || []);
  });
};
export default readDataFromFirebase;
