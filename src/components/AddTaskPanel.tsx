import { useState } from 'react';
import firebase from 'firebase';
import { Input, Button } from '@mui/material';
import { Box } from '@mui/system';
const AddTaskPanel = ({ currentUid }: { currentUid: string }) => {
  const [inputAddPanel, setInputAddPanel] = useState('');

  const addTask = () => {
    firebase
      .database()
      .ref('users/' + currentUid)
      .push({
        label: inputAddPanel,
        isDone: false,
        description: '',
      });
    setInputAddPanel('');
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Input
        onKeyDown={(e) => handleKeyDown(e)}
        sx={{ width: '500px' }}
        value={inputAddPanel}
        onChange={(e) => setInputAddPanel(e.target.value)}
      />
      <Button onClick={() => addTask()}>add</Button>
    </Box>
  );
};
export default AddTaskPanel;
