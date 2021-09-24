import firebase from 'firebase';
const getCurrentUserUid = () => firebase.auth()?.currentUser?.uid;
export default getCurrentUserUid;
