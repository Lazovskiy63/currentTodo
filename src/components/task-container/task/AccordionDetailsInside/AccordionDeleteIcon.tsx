import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import getCurrentUserUid from '../../../FirebaseTools/getCurrentUid';
import firebase from 'firebase/app';
import { appendToast, TOAST_TYPE } from '../../../../ServiceSystemToast';

const handleDeleteTask = (taskId: any) => {
  const taskRef = firebase
    .database()
    .ref('users/' + getCurrentUserUid() + '/' + taskId);
  taskRef.remove((error) => {
    if (error) {
      appendToast('ERROR', 'Task hasnt been deleted', TOAST_TYPE.ERROR);
    } else {
      appendToast('Alert', 'Task has been deleted', TOAST_TYPE.WARNING);
    }
  });
};
type AccordionDeleteIconArgs = {
  taskId: any;
};
const AccordionDeleteIcon = ({ taskId }: AccordionDeleteIconArgs) => {
  return (
    <IconButton
      aria-label="Delete"
      onClick={() => {
        console.log(taskId);
        console.log(getCurrentUserUid());
        handleDeleteTask(taskId);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};
export default AccordionDeleteIcon;
