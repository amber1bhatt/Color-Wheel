import { InputAdornment, TextField } from "@mui/material";

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };
  return (
    <TextField
      id="color-picker-field"
      label="Pick a Color"
      variant="outlined"
      value={selectedColor}
      onChange={handleChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">#</InputAdornment>,
      }}
    />
  );
};

export default ColorPicker;
