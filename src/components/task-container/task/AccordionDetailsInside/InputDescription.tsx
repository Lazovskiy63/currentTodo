import { Input } from '@mui/material';
type InputDescriptionArgs = {
  inputDescription: any;
  setInputDescription: any;
  onKeyEnter: any;
};
const InputDescription = ({
  inputDescription,
  setInputDescription,
  onKeyEnter,
}: InputDescriptionArgs) => {
  return (
    <Input
      sx={{ width: '431px', overflow: 'hidden' }}
      onKeyDown={(e) => onKeyEnter()}
      value={inputDescription}
      onChange={(e) => setInputDescription(e.target.value)}
    />
  );
};
export default InputDescription;
