import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
  Paper,
  Checkbox,
  Input,
} from '@mui/material';
import { Box } from '@mui/system';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckboxIsDone from './CheckboxTodo';
import InputLabel from './InputLabel';
import AccordionDetailsInside from './AccordionDetailsInside/AccordionDetailsInside';
import CheckboxTodo from './CheckboxTodo';
import { useState } from 'react';
import firebase from 'firebase/app';
import getCurrentUserUId from '../../FirebaseTools/getCurrentUid';

type TodoItemArgs = {
  label: any;
  description: any;
  taskId: any;
  isDone: any;
  expanded: any;
  onChangeTodos: any;
  openDescriptionTaskId: any;
  setOpenDescriptionTaskId: any;
  setInputDescription: any;
  setInputLabel: any;
  inputDescription: any;
  inputLabel: any;
};
const TodoItem = ({
  onChangeTodos,
  label,
  description,
  taskId,
  isDone,
  expanded,
  openDescriptionTaskId,
  setOpenDescriptionTaskId,
  setInputDescription,
  setInputLabel,
  inputDescription,
  inputLabel,
}: TodoItemArgs) => {
  const onKeyEnter = () => {
    console.log('entertipa');
    onChangeTodos(1, 1, 1);
  };
  return (
    // sx={{ height: '500px', overflow: 'auto' }} ЭТО БЫЛО В ПЕПЕРЕ
    <Paper>
      <Accordion
      // expanded={expanded === todo.uid}
      // onChange={() => handleChange()}
      // onFocus={() => {
      //   if (todo.uid !== isChangeDescription) {
      //     setIsChangeDescription();
      //   }
      // }}
      >
        <AccordionSummary
          expandIcon={null}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '-webkit-fill-availa ble',
            }}
          >
            {openDescriptionTaskId === taskId ? (
              <InputLabel
                onKeyEnter={() => onKeyEnter}
                setInputLabel={() => setInputLabel}
                inputLabel={inputLabel}
              />
            ) : (
              <Typography
                sx={{ width: '450px', overflow: 'hidden' }}
                display="inline-block"
              >
                {label}
              </Typography>
            )}
            <CheckboxTodo isDone={isDone} taskId={taskId} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionDetailsInside
            setInputDescription={() => setInputDescription}
            onKeyEnter={() => onKeyEnter}
            openDescriptionTaskId={openDescriptionTaskId}
            description={description}
            taskId={taskId}
          />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
export default TodoItem;
