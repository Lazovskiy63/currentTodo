import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { CONSTANTS } from './types/types';

const Footer = ({ setFilter }: { setFilter: Function }) => {
  return (
    <Box>
      <Button onClick={() => setFilter(CONSTANTS.ALL)}>all</Button>
      <Button onClick={() => setFilter(CONSTANTS.NOT_DONE)}>during</Button>
      <Button onClick={() => setFilter(CONSTANTS.DONE)}>completed</Button>
    </Box>
  );
};
export default Footer;
