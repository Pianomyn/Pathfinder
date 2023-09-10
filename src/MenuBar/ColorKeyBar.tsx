import {
  PLACEABLE_COLOR_MAPPINGS_TYPE,
} from "../Utility/types";
import { useState } from "react";
import { PLACEABLE_COLOR_MAPPINGS } from "../Utility/constants";

interface ColorKeyProps {
  name: PLACEABLE_COLOR_MAPPINGS_TYPE;
  color: string;
  index: number;
  currentlySelectedIndex: number;
  setCurrentlySelectedIndex: (value: number) => void;
  setCurrentCellToPlace: (value: PLACEABLE_COLOR_MAPPINGS_TYPE | null) => void;
}

const ColorKey = ({
  name,
  color,
  index,
  currentlySelectedIndex,
  setCurrentlySelectedIndex,
  setCurrentCellToPlace,
}: ColorKeyProps) => {
  return (
    <div
      className={`hover:cursor-pointer border border-solid  flex mx-0.5 p-2 ${
        index === currentlySelectedIndex ? "bg-blue-300" : ""
      }`}
      onClick={() => {
        if (index === currentlySelectedIndex) {
          setCurrentlySelectedIndex(-1);
          setCurrentCellToPlace(null);
        } else {
          setCurrentlySelectedIndex(index);
          setCurrentCellToPlace(name);
        }
      }}
    >
      <div className={`border border-solid  w-6 h-6 ${color}`}></div>
      <p>&nbsp;{name}</p>
    </div>
  );
};

const ColorKeyBar = ({
  setCurrentCellTypeToPlace,
}: {
  setCurrentCellTypeToPlace: (value: PLACEABLE_COLOR_MAPPINGS_TYPE | null) => void;
}) => {
  const [currentlySelectedIndex, setCurrentlySelectedIndex] = useState(-1);
  return (
    <div id="color-key-bar" className="flex items-center mx-2">
      {Object.entries(PLACEABLE_COLOR_MAPPINGS).map(([key, val], index) => {
        return (
          <ColorKey
            key={`color-key-${key}-${val}`}
            name={key as PLACEABLE_COLOR_MAPPINGS_TYPE}
            color={val}
            index={index}
            currentlySelectedIndex={currentlySelectedIndex}
            setCurrentlySelectedIndex={setCurrentlySelectedIndex}
            setCurrentCellToPlace={setCurrentCellTypeToPlace}
          />
        );
      })}
    </div>
  );
};

export default ColorKeyBar;
