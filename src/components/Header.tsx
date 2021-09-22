import { Paper, Typography } from '@mui/material';

const Header = ({ dataFromFirebase }: any) => {
  return (
    <Paper
      sx={{
        marginTop: '5px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Typography>You have {dataFromFirebase.length} tasks</Typography>
    </Paper>
  );
};
export default Header;
