import TextField from '@mui/material/TextField';

export default function TextForm({label, value, name, onChange, onBlur}) {
  return (
      <TextField
          id="standard-basic"
          label={label}
          sx={{width: '100%'}}
          variant="outlined"
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
      />
  );
}
