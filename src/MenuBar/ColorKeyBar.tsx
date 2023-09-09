import {
  PlaceableColorMapping,
  AllColorMapping,
  MultiplePlaceableColorMapping,
} from "../Utility/types";
import { useState } from "react";

interface ColorKeyProps {
  name: PlaceableColorMapping;
  color: string;
  index: number;
  currentlySelectedIndex: number;
  setCurrentlySelectedIndex: (value: number) => void;
  setCurrentCellToPlace: (value: PlaceableColorMapping | null) => void;
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
          //console.log(name);
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
  setCurrentCellTypeToPlace: (value: PlaceableColorMapping | null) => void;
}) => {
  const [currentlySelectedIndex, setCurrentlySelectedIndex] = useState(-1);
  return (
    <div id="color-key-bar" className="flex items-center mx-2">
      {Object.entries(PlaceableColorMapping).map(([key, val], index) => {
        return (
          <ColorKey
            key={`color-key-${key}-${val}`}
            name={key as PlaceableColorMapping}
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
