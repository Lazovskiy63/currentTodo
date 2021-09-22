import firebase from 'firebase';
const readDataFromFirebase = (uid, setDataFromFirebaseFromTodoApp) => {
  const parseItemFirebase = (item) => {
    if (item) {
      return Object.entries(item).map(([key, value]) => {
        return {
          uid: key,
          label: value.label,
          description: value.description,
          isDone: value.isDone,
        };
      });
    }
  };
  var db = firebase.database().ref('users/' + uid);
  db.on('value', (snapshot) => {
    const item = snapshot.val();
    setDataFromFirebaseFromTodoApp(parseItemFirebase(item) || []);
  });
};
export default readDataFromFirebase;
