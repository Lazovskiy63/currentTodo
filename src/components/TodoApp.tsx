import Header from './Header';
import TaskContainer from './task-container/TaskContainer';
import AddTaskPanel from './AddTaskPanel';
import Footer from './Footer';
import { useState } from 'react';
import { Container } from '@mui/material';
import { CONSTANTS } from './types/types';
import { app } from './FirebaseTools/firebase.config';
const TodoApp = ({
  currentUid,
  dataFromFirebase,
}: {
  currentUid: string;
  dataFromFirebase: any;
}) => {
  const [filter, setFilter] = useState(CONSTANTS.ALL);

  return (
    <div>
      <Container maxWidth="sm">
        <Header dataFromFirebase={dataFromFirebase} />
        <TaskContainer
          currentUid={currentUid}
          filter={filter}
          dataFromFirebase={dataFromFirebase}
        />
        <AddTaskPanel currentUid={currentUid} />
        <Footer setFilter={setFilter} />
      </Container>
    </div>
  );
};
export default TodoApp;
