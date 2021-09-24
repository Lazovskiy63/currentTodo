import { useState } from 'react';
import { CONSTANTS } from '../types/types';
import { appendToast, TOAST_TYPE } from '../../ServiceSystemToast';
import TodoItem from './task/TodoItem';
import firebase from 'firebase/app';
import { CodeOff } from '@mui/icons-material';
import InputDescription from './task/AccordionDetailsInside/InputDescription';
import getCurrentUserUid from '../FirebaseTools/getCurrentUid';

interface TaskArguments {
  currentUid: string;
  dataFromFirebase: any;
  filter: string;
}

const TaskContainer = ({
  currentUid,
  dataFromFirebase,
  filter,
}: TaskArguments) => {
  const [inputDescription, setInputDescription] = useState('');
  const [inputLabel, setInputLabel] = useState('');
  const [openDescriptionTaskId, setOpenDescriptionTaskId] = useState('');
  const [expanded, setExpanded] = useState('');

  interface itemFirebase {
    uid: string;
    label: string;
    isDone: boolean;
    description: string;
  }

  const filterItems = (filter: string, todoItems: itemFirebase[]) => {
    let filteredTodoItems = null;
    switch (filter) {
      case CONSTANTS.DONE:
        filteredTodoItems = todoItems.filter(
          (item: itemFirebase) => item.isDone === true
        );
        break;
      case CONSTANTS.NOT_DONE:
        filteredTodoItems = todoItems.filter(
          (item: itemFirebase) => item.isDone === false
        );
        break;
      default:
        filteredTodoItems = todoItems;
        break;
    }
    return filteredTodoItems;
  };
  const handleChangeTodos = (id: any, description: any, label: any) => {
    console.log('sssss');
    return function () {
      if (openDescriptionTaskId === id) {
        const taskRef = firebase
          .database()
          .ref('users/' + getCurrentUserUid + '/' + id);
        taskRef.update({
          description: inputDescription,
          label: inputLabel,
        });
        setInputDescription('');
        setInputLabel('');
        setOpenDescriptionTaskId('');
      }
      if (openDescriptionTaskId === '') {
        setOpenDescriptionTaskId(id);
        setInputLabel(label);
        setInputDescription(description);
      }
    };
  };

  let filteredItems: any = filterItems(filter, dataFromFirebase);

  return filteredItems.map((todo: any) => {
    return (
      <TodoItem
        setInputDescription={setInputDescription}
        setInputLabel={setInputLabel}
        inputDescription={InputDescription}
        inputLabel={inputLabel}
        onChangeTodos={handleChangeTodos(todo.id, todo.description, todo.label)}
        setOpenDescriptionTaskId={() => setOpenDescriptionTaskId}
        openDescriptionTaskId={openDescriptionTaskId}
        expanded={expanded}
        taskId={todo.id}
        label={todo.label} // TODO: Pass label
        isDone={todo.isDone} // TODO: Pass isDone
        description={todo.description} // TODO: Pass description
      />
    );
  });
};
export default TaskContainer;
