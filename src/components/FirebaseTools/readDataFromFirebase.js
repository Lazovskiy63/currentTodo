import firebase from 'firebase';

import { appendToast, TOAST_TYPE } from '../../ServiceSystemToast';

const parseItemFirebase = (item) => {
  if (item) {
    return Object.entries(item).map(([key, value]) => {
      return {
        id: key,
        label: value.label,
        description: value.description,
        isDone: value.isDone,
      };
    });
  }
};

const readDataFromFirebase = (uid, setDataFromFirebaseFromTodoApp) => {
  const db = firebase.database().ref('users/' + uid);

  db.on('value', (snapshot) => {
    if (snapshot.val()) {
      const item = snapshot.val();
      setDataFromFirebaseFromTodoApp(parseItemFirebase(item) || []);
      appendToast('Alert', 'Items has took from Database', TOAST_TYPE.ALERT);
    } else {
      appendToast('ERROR', 'Items hasnt took from Database', TOAST_TYPE.ERROR);
    }
  });
};

export default readDataFromFirebase;
