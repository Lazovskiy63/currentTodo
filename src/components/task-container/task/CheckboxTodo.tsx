import firebase from 'firebase/app';
import { Checkbox } from '@mui/material';
import getCurrentUid from '../../FirebaseTools/getCurrentUid';

const handleToggleMark = (id: string, isDone: boolean) => {
  const taskRef = firebase
    .database()
    .ref('users/' + getCurrentUid() + '/' + id);
  taskRef.update({ isDone: !isDone });
};
type CheckboxTodoArgs = {
  taskId: any;
  isDone: any;
};
const CheckboxTodo = ({ taskId, isDone }: CheckboxTodoArgs) => {
  return (
    <Checkbox
      sx={{ display: 'inline-block' }}
      checked={isDone}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleToggleMark(taskId, isDone)
      }
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        e.stopPropagation()
      }
    />
  );
};
export default CheckboxTodo;
