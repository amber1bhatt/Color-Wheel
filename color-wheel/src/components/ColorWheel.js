import React, { useRef, useState } from "react";
import { Card, CardContent } from "@mui/material";
import tinycolor from "tinycolor2";

const ColorWheel = ({ onSelectColor }) => {
  const wheelRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    if (isDragging && wheelRef.current) {
      const rect = wheelRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left - wheelRef.current.offsetWidth / 2;
      const y = event.clientY - rect.top - wheelRef.current.offsetHeight / 2;

      // Adjust for the conic-gradient starting at 0 degrees
      let angle = Math.atan2(y, x);
      let degrees = (angle * (180 / Math.PI) + 360) % 360;
      degrees = (degrees + 90) % 360;

      if (degrees < 0) {
        degrees += 360;
      }

      const pickedColor = tinycolor({ h: degrees, s: 1, v: 1 }).toHexString();
      onSelectColor(pickedColor);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSimpleClick = (event) => {
    if (wheelRef.current) {
      const rect = wheelRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left - wheelRef.current.offsetWidth / 2;
      const y = event.clientY - rect.top - wheelRef.current.offsetHeight / 2;

      // Adjust for the conic-gradient starting at 0 degrees
      let angle = Math.atan2(y, x);
      let degrees = (angle * (180 / Math.PI) + 360) % 360;
      degrees = (degrees + 90) % 360;

      if (degrees < 0) {
        degrees += 360;
      }

      const pickedColor = tinycolor({ h: degrees, s: 1, v: 1 }).toHexString();
      onSelectColor(pickedColor);
    }
  };

  const createConicGradient = () => {
    const gradientStops = [];
    for (let i = 0; i < 360; i++) {
      const hue = i % 360;
      gradientStops.push(`hsl(${hue}, 100%, 50%)`);
    }

    return `conic-gradient(${gradientStops.join(", ")})`;
  };

  const wheelStyle = {
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: createConicGradient(),
    border: "none",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  };

  return (
    <Card
      style={{ margin: "20px", ...wheelStyle }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleSimpleClick} // Added click event for simple click
      ref={wheelRef}
    >
      <CardContent style={wheelStyle} />
    </Card>
  );
};

export default ColorWheel;
