import { PlaceableColorMapping, AllColorMapping } from "../types";
import { useState } from "react";

interface ColorKeyProps {
  name: string;
  color: string;
  index: number;
  currentlySelectedIndex: number;
  setCurrentlySelectedIndex: (value: number) => void;
  setCurrentCellToPlace: (value: string | null) => void;
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
      className={`hover:cursor-pointer border border-solid rounded flex mx-0.5 p-2 ${
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
      <div className={`border border-solid rounded w-6 h-6 ${color}`}></div>
      <p>&nbsp;{name}</p>
    </div>
  );
};

const ColorKeyBar = ({
  setCurrentCellTypeToPlace,
}: {
  setCurrentCellTypeToPlace: (value: string | null) => void;
}) => {
  const [currentlySelectedIndex, setCurrentlySelectedIndex] = useState(-1);
  return (
    <div id="color-key-bar" className="flex items-center mx-2">
      {Object.entries(PlaceableColorMapping).map(([key, val], index) => {
        return (
          <ColorKey
            key={`color-key-${key}-${val}`}
            name={key}
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
