import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const ResultingColors = ({ colors }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [colorNames, setColorNames] = useState();

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 250);
  };

  const copyPaletteToClipboard = () => {
    const paletteText = colors.join(", ");
    navigator.clipboard.writeText(paletteText);
  };

  useEffect(() => {
    const getColorNames = async () => {
      try {
        const response = await fetch(
          `https://api.color.pizza/v1/?values=${colors
            .toString()
            .replaceAll("#", "")}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch color names (status ${response.status})`
          );
        }

        const data = await response.json();
        setColorNames(data.colors);
      } catch (error) {
        console.error("Error fetching color names:", error.message);
      }
    };

    getColorNames();
  }, [colors]);

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
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginTop: "5px", color: "#ccc" }}
            >
              {colorNames[index]?.name}
            </Typography>
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
