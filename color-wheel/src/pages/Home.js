import { useEffect, useState } from "react";
import TheorySelector from "../components/TheorySelector";
import ColorPicker from "../components/ColorPicker";
import ColorWheel from "../components/ColorWheel";
import tinycolor from "tinycolor2";
import ResultingColors from "../components/ResultingColors";

const SPLIT_COMPLEMENTARY_ROTATIONS = [150, 210];
const COMPLEMENTARY_ROTATION = 180;
const TRIADIC_ROTATION = 120;
const TETRADIC_ROTATION = 90;
const PENTADIC_ROTATION = 60;
const HEXADIC_ROTATION = 30;
const ANALOGOUS_OFFSET = 30;
const MONOCHROMATIC_SCALING = 0.25;

const complementaryTheory = (color) => {
  const hexColor = tinycolor(color).toHexString();
  const hslColor = tinycolor(color).toHsl();
  hslColor.h = (hslColor.h + COMPLEMENTARY_ROTATION) % 360;
  const colors = [hexColor, tinycolor(hslColor).toHexString()];
  return colors;
};

const splitComplementaryTheory = (color) => {
  const hexColor = tinycolor(color).toHexString();
  const hslSplitColor150 = tinycolor(color).toHsl();
  const hslSplitColor210 = tinycolor(color).toHsl();
  hslSplitColor150.h =
    (hslSplitColor150.h + SPLIT_COMPLEMENTARY_ROTATIONS[0]) % 360;
  hslSplitColor210.h =
    (hslSplitColor210.h + SPLIT_COMPLEMENTARY_ROTATIONS[1]) % 360;
  const colors = [
    hexColor,
    tinycolor(hslSplitColor150).toHexString(),
    tinycolor(hslSplitColor210).toHexString(),
  ];
  return colors;
};

const analogousTheory = (color) => {
  const hexColor = tinycolor(color).toHexString();
  const hslBase = tinycolor(color).toHsl();
  const numAnalogous = 3;

  const colors = [hexColor];

  for (let i = 1; i < numAnalogous + 1; i++) {
    colors.push(
      tinycolor({
        h: (hslBase.h + i * ANALOGOUS_OFFSET) % 360,
        s: hslBase.s,
        l: hslBase.l,
      }).toHexString()
    );
  }

  return colors;
};

const triadicTheory = (color) => {
  const hexColor = tinycolor(color).toHexString();
  const hslBase = tinycolor(color).toHsl();
  const numTriadic = 3;

  const colors = [hexColor];

  for (let i = 1; i < numTriadic; i++) {
    colors.push(
      tinycolor({
        h: (hslBase.h + i * TRIADIC_ROTATION) % 360,
        s: hslBase.s,
        l: hslBase.l,
      }).toHexString()
    );
  }

  return colors;
};

const tetradicTheory = (color) => {
  const hexColor = tinycolor(color).toHexString();
  const hslBase = tinycolor(color).toHsl();
  const numTetradic = 4;

  const colors = [hexColor];

  for (let i = 1; i < numTetradic; i++) {
    colors.push(
      tinycolor({
        h: (hslBase.h + i * TETRADIC_ROTATION) % 360,
        s: hslBase.s,
        l: hslBase.l,
      }).toHexString()
    );
  }

  return colors;
};

const pentadicTheory = (color) => {
  const hexColor = tinycolor(color).toHexString();
  const hslBase = tinycolor(color).toHsl();
  const numPentadic = 5;

  const colors = [hexColor];

  for (let i = 1; i < numPentadic; i++) {
    colors.push(
      tinycolor({
        h: (hslBase.h + i * PENTADIC_ROTATION) % 360,
        s: hslBase.s,
        l: hslBase.l,
      }).toHexString()
    );
  }

  return colors;
};

const hexadicTheory = (color) => {
  const hexColor = tinycolor(color).toHexString();
  const hslBase = tinycolor(color).toHsl();
  const numHexadic = 6;

  const colors = [hexColor];

  for (let i = 1; i < numHexadic; i++) {
    colors.push(
      tinycolor({
        h: (hslBase.h + i * HEXADIC_ROTATION) % 360,
        s: hslBase.s,
        l: hslBase.l,
      }).toHexString()
    );
  }

  return colors;
};

const monochromaticTheory = (color) => {
  const hexColor = tinycolor(color).toHexString();
  const rgbColor = tinycolor(color).toRgb();
  const rgbDark = tinycolor(color).toRgb();
  const rgbLight = tinycolor(color).toRgb();

  for (const key in rgbColor) {
    const darkValue = rgbColor[key] * (1 - MONOCHROMATIC_SCALING);
    const lightValue = rgbColor[key] * (1 + MONOCHROMATIC_SCALING);

    rgbDark[key] = Math.max(0, Math.min(255, darkValue));
    rgbLight[key] = Math.max(0, Math.min(255, lightValue));
  }

  return [
    hexColor,
    tinycolor(rgbDark).toHexString(),
    tinycolor(rgbLight).toHexString(),
  ];
};

const Home = () => {
  const [selectedTheory, setSelectedTheory] = useState("Complementary");
  const [selectedColor, setSelectedColor] = useState();
  const [resultingColors, setResultingColors] = useState();

  const handleTheoryChange = (theory) => {
    setSelectedTheory(theory);
    setResultingColors(chooseTheory(theory, selectedColor));
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setResultingColors(chooseTheory(selectedTheory, color));
  };

  useEffect(() => {
    handleTheoryChange(selectedTheory);
  }, [selectedTheory]);

  useEffect(() => {
    handleColorChange(selectedColor);
  }, [selectedColor]);

  const chooseTheory = (theory, color) => {
    switch (theory) {
      case "Monochromatic":
        return monochromaticTheory(color);
      case "Complementary":
        return complementaryTheory(color);
      case "Split Complementary":
        return splitComplementaryTheory(color);
      case "Analogous":
        return analogousTheory(color);
      case "Triadic":
        return triadicTheory(color);
      case "Tetradic":
        return tetradicTheory(color);
      case "Pentadic":
        return pentadicTheory(color);
      case "Hexadic":
        return hexadicTheory(color);
      default:
        return [color];
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ColorWheel onSelectColor={handleColorChange} />
      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <TheorySelector
        selectedTheory={selectedTheory}
        setSelectedTheory={setSelectedTheory}
      />
      {selectedColor && selectedTheory && resultingColors && (
        <ResultingColors colors={resultingColors} />
      )}
    </div>
  );
};

export default Home;
