import { Box } from '@mui/system';
import { Typography, Paper, IconButton } from '@mui/material';
import InputDescription from './InputDescription';
import AccordionDeleteIcon from './AccordionDeleteIcon';
import AccordionChangeIcon from './AccordionChangeIcon';
type AccordionDetailsInsideArgs = {
  description: any;
  taskId: any;
  openDescriptionTaskId: any;
  onKeyEnter: any;
  setInputDescription: any;
};
const AccordionDetailsInside = ({
  description,
  taskId,
  openDescriptionTaskId,
  onKeyEnter,
  setInputDescription,
}: AccordionDetailsInsideArgs) => {
  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
      }}
    >
      <Box sx={{ p: 1, width: '100%', height: '70%' }}>
        {openDescriptionTaskId === taskId ? (
          <InputDescription
            inputDescription={InputDescription}
            setInputDescription={() => setInputDescription}
            onKeyEnter={onKeyEnter}
          />
        ) : (
          <Typography
            sx={{
              wordBreak: 'break-all',
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'grid', alignItems: 'center' }}>
        <AccordionChangeIcon onKeyEnter={onKeyEnter} />
        <AccordionDeleteIcon taskId={taskId} />
      </Box>
    </Box>
  );
};
export default AccordionDetailsInside;
