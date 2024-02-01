import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const ResultingColors = ({ colors }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);

    // Reset the copiedIndex after a short delay to remove the animation
    setTimeout(() => {
      setCopiedIndex(null);
    }, 250);
  };

  const copyPaletteToClipboard = () => {
    const paletteText = colors.join(", ");
    navigator.clipboard.writeText(paletteText);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {colors.map((color, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 10px",
              cursor: "pointer",
              transition: "background-color 0.5s",
            }}
            onClick={() => copyToClipboard(color, index)}
            style={{
              backgroundColor: copiedIndex === index ? "#ccc" : "initial",
            }}
          >
            <Box
              sx={{
                backgroundColor: color,
                width: "110px",
                height: "50px",
                borderRadius: "5%",
              }}
            />
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginTop: "5px", color: "#ccc" }}
            >
              {color.toUpperCase()}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button
        variant="outlined"
        size="medium"
        sx={{ marginTop: "20px", color: "#ccc" }}
        onClick={copyPaletteToClipboard}
      >
        Copy Palette
      </Button>
    </>
  );
};

export default ResultingColors;
