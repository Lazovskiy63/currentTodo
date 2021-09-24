import { Input } from '@mui/material';
type InputLabelArgs = {
  setInputLabel: any;
  inputLabel: any;
  onKeyEnter: any;
};
const InputLabel = ({
  setInputLabel,
  inputLabel,
  onKeyEnter,
}: InputLabelArgs) => {
  return (
    <Input
      sx={{ width: '450px', overflow: 'hidden' }}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => onKeyEnter()}
      value={inputLabel}
      onChange={(e) => setInputLabel(e.target.value)}
    />
  );
};
export default InputLabel;
