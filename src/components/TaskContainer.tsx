import firebase from 'firebase';

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
import { useState } from 'react';
import { CONSTANTS } from './types/types';

const TaskContainer = ({
  currentUid,
  dataFromFirebase,
  filter,
}: {
  currentUid: string;
  dataFromFirebase: any;
  filter: string;
}) => {
  const [isChangeDescription, setIsChangeDescription] = useState('');
  const [expanded, setExpanded] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputLabel, setInputLabel] = useState('');
  const handleChange =
    (panel: string) =>
    (event: React.SyntheticEvent<Element, Event>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : '');
    };

  interface itemFirebase {
    uid: string;
    label: string;
    isDone: boolean;
    description: string;
  }
  const handleChangeTodos = (uid: string, item: itemFirebase) => {
    if (isChangeDescription === item.uid) {
      const taskRef = firebase.database().ref('users/' + uid + '/' + item.uid);
      taskRef.update({
        description: inputDescription,
        label: inputLabel,
      });
      setInputDescription('');
      setInputLabel('');
      setIsChangeDescription('');
    }
    if (isChangeDescription === '') {
      setIsChangeDescription(item.uid);
      setInputLabel(item.label);
      setInputDescription(item.description);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
    uid: string,
    item: itemFirebase
  ) => {
    if (e.key === 'Enter') {
      handleChangeTodos(uid, item);
    }
  };
  const handleToggleMark = (uid: string, item: itemFirebase) => {
    const taskRef = firebase.database().ref('users/' + uid + '/' + item.uid);
    taskRef.update({ label: item.label, isDone: !item.isDone });
  };
  const handleDeleteTask = (uid: string, item: itemFirebase) => {
    const taskRef = firebase.database().ref('users/' + uid + '/' + item.uid);
    taskRef.remove();
  };
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

  let filtered = filterItems(filter, dataFromFirebase);
  return (
    <div>
      <Paper sx={{ height: '500px', overflow: 'auto' }}>
        {filtered.map((item: itemFirebase, index: number) => {
          return (
            <Accordion
              key={index}
              expanded={expanded === item.uid}
              onChange={handleChange(item.uid)}
              onFocus={() => {
                if (item.uid !== isChangeDescription) {
                  setIsChangeDescription('');
                }
              }}
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
                    width: '-webkit-fill-available',
                  }}
                >
                  {isChangeDescription === item.uid ? (
                    <Input
                      sx={{ width: '450px', overflow: 'hidden' }}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => handleKeyDown(e, currentUid, item)}
                      value={inputLabel}
                      onChange={(e) => setInputLabel(e.target.value)}
                    />
                  ) : (
                    <Typography
                      sx={{ width: '450px', overflow: 'hidden' }}
                      display="inline-block"
                    >
                      {item.label}
                    </Typography>
                  )}
                  <Checkbox
                    sx={{ display: 'inline-block' }}
                    checked={item.isDone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleToggleMark(currentUid, item)
                    }
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => e.stopPropagation()}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                  }}
                >
                  <Box sx={{ p: 1, width: '100%', height: '70%' }}>
                    {isChangeDescription === item.uid ? (
                      <Input
                        sx={{ width: '431px', overflow: 'hidden' }}
                        onKeyDown={(e) => handleKeyDown(e, currentUid, item)}
                        value={inputDescription}
                        onChange={(e) => setInputDescription(e.target.value)}
                      />
                    ) : (
                      <Typography
                        sx={{
                          wordBreak: 'break-all',
                        }}
                      >
                        {item.description}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'grid', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => handleChangeTodos(currentUid, item)}
                      aria-label="Create"
                    >
                      <CreateIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => handleDeleteTask(currentUid, item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Paper>
    </div>
  );
};
export default TaskContainer;
