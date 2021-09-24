import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
type AccordionChageIconArgs = {
  onKeyEnter: any;
};

const AccordionChangeIcon = ({ onKeyEnter }: AccordionChageIconArgs) => {
  return (
    <IconButton
      onClick={() => {
        console.log(1);
        onKeyEnter();
      }}
      aria-label="Create"
    >
      <CreateIcon />
    </IconButton>
  );
};
export default AccordionChangeIcon;
