import Header from './Header';
import TaskContainer from './TaskContainer';
import AddTaskPanel from './AddTaskPanel';
import Footer from './Footer';
import { useState } from 'react';
import { Container } from '@mui/material';

const TodoApp = ({ currentUid, dataFromFirebase }) => {
  const CONSTANTS = {
    ALL: 'ALL',
    DONE: 'DONE',
    NOT_DONE: 'NOT_DONE',
  };

  const [filter, setFilter] = useState(CONSTANTS.ALL);

  return (
    <div>
      <Container maxWidth="sm">
        <Header dataFromFirebase={dataFromFirebase} />
        <TaskContainer
          currentUid={currentUid}
          filter={filter}
          CONSTANTS={CONSTANTS}
          dataFromFirebase={dataFromFirebase}
        />
        <AddTaskPanel currentUid={currentUid} />
        <Footer CONSTANTS={CONSTANTS} setFilter={setFilter} />
      </Container>
    </div>
  );
};
export default TodoApp;
