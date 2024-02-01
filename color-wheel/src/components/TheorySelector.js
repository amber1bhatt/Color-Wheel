import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TheorySelector = ({ selectedTheory, setSelectedTheory }) => {
  const handleChange = (event) => {
    setSelectedTheory(event.target.value);
  };

  const theories = [
    "Monochromatic",
    "Complementary",
    "Split Complementary",
    "Analogous",
    "Triadic",
    "Tetradic",
    "Pentadic",
    "Hexadic",
  ];

  return (
    <Box sx={{ width: 240, textAlign: "center", marginTop: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ textAlign: "center" }}>
          Color Combination
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTheory}
          label="Color Combination"
          onChange={handleChange}
        >
          {theories.map((theory, id) => {
            return (
              <MenuItem key={id} value={`${theory}`}>
                {theory}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TheorySelector;
