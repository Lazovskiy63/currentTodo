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

const TaskContainer = ({ currentUid, CONSTANTS, dataFromFirebase, filter }) => {
  const [isChangeDescription, setIsChangeDescription] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [inputDesctiption, setInputDesctiption] = useState('');
  const [inputLabel, setInputLabel] = useState('');
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(isChangeDescription);
  console.log(expanded);
  console.log(inputDesctiption);
  console.log(inputLabel);
  const handleChangeTodos = (uid, item) => {
    if (isChangeDescription === item[0]) {
      const taskRef = firebase.database().ref('users/' + uid + '/' + item[0]);
      taskRef.update({
        description: inputDesctiption,
        label: inputLabel,
      });
      setInputDesctiption('');
      setInputLabel('');
      setIsChangeDescription('');
    }
    if (isChangeDescription === '') {
      setIsChangeDescription(item[0]);
      setInputLabel(item[1].label);
      setInputDesctiption(item[1].description);
    }
  };

  const handleKeyDown = (e, uid, item) => {
    if (e.key === 'Enter') {
      handleChangeTodos(uid, item);
    }
  };
  const handleToggleMark = (uid, item) => {
    const taskRef = firebase.database().ref('users/' + uid + '/' + item[0]);
    taskRef.update({ label: item[1].label, isDone: !item[1].isDone });
  };
  const handleDeleteTask = (uid, item) => {
    const taskRef = firebase.database().ref('users/' + uid + '/' + item[0]);
    taskRef.remove();
  };
  const filterItems = (filter, todoItems) => {
    let filteredTodoItems = null;
    switch (filter) {
      case CONSTANTS.DONE:
        filteredTodoItems = todoItems.filter((item) => item[1].isDone === true);
        break;
      case CONSTANTS.NOT_DONE:
        filteredTodoItems = todoItems.filter(
          (item) => item[1].isDone === false
        );
        break;
      default:
        filteredTodoItems = todoItems;
        break;
    }
    return filteredTodoItems;
  };

  let filtered = filterItems(filter, Object.entries(dataFromFirebase));
  return (
    <div>
      <Paper sx={{ height: '500px', overflow: 'auto' }}>
        {filtered.map((item, index) => {
          return (
            <Accordion
              key={index}
              expanded={expanded === item[0]}
              onChange={handleChange(item[0])}
              // onFocus={() => setIsChangeDescription('')}
              onFocus={() => {
                if (item[0] !== isChangeDescription) {
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
                  {isChangeDescription === item[0] ? (
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
                      {item[1].label}
                    </Typography>
                  )}
                  <Checkbox
                    display="inline-block"
                    checked={item[1].isDone}
                    onChange={(e) => handleToggleMark(currentUid, item)}
                    onClick={(e) => e.stopPropagation()}
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
                    {isChangeDescription === item[0] ? (
                      <Input
                        sx={{ width: '431px', overflow: 'hidden' }}
                        onKeyDown={(e) => handleKeyDown(e, currentUid, item)}
                        value={inputDesctiption}
                        onChange={(e) => setInputDesctiption(e.target.value)}
                      />
                    ) : (
                      <Typography
                        sx={{
                          wordBreak: 'break-all',
                          MaxWidth: '431px',
                        }}
                      >
                        {item[1].description}
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
