import "./App.css";
import Graph from "./Algorithms/Graph/Graph";

import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./Utility/constants";
import { PlaceableColorMapping, CellId } from "./Utility/types";
import Grid from "./Grid/Grid";
import PlayBar from "./MenuBar/PlayBar";
import SettingsBar from "./MenuBar/SettingsBar";
import ColorKeyBar from "./MenuBar/ColorKeyBar";
import { useEffect, useState } from "react";

export default function App() {
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
  const [hideInputError, setHideInputError] = useState<boolean>(true);

  const [currentCellTypeToPlace, setCurrentCellTypeToPlace] =
    useState<PlaceableColorMapping | null>(null);
  const [sourceCellId, setSourceCellId] = useState<CellId | null>(null);
  const [targetCellId, setTargetCellId] = useState<CellId | null>(null);

  const [canEdit, setCanEdit] = useState<boolean>(true);

  var graph = new Graph(height, width, sourceCellId, targetCellId);

  useEffect(() => {
    setSourceCellId(null);
    setTargetCellId(null);
  }, [height, width]);

  return (
    <div className="font-sans">
      <h1 className="text-2xl mt-2 text-center">Pathfinder</h1>
      <div id="options-bar-wrapper" className="w-screen flex justify-center">
        <div
          id="options-bar"
          className="flex w-screen items-start justify-evenly my-3"
        >
          <SettingsBar
            setHeight={setHeight}
            setWidth={setWidth}
            hideInputError={hideInputError}
            setHideInputError={setHideInputError}
            height={height}
            width={width}
            sourceCellId={sourceCellId}
            targetCellId={targetCellId}
          />
          <PlayBar />
          <ColorKeyBar setCurrentCellTypeToPlace={setCurrentCellTypeToPlace} />
        </div>
      </div>
      <div className="w-screen flex justify-center items-center">
        <Grid
          graph={graph}
          height={height}
          width={width}
          currentCellToPlace={currentCellTypeToPlace}
          sourceCellId={sourceCellId}
          targetCellId={targetCellId}
          setSourceCellId={setSourceCellId}
          setTargetCellId={setTargetCellId}
        />
      </div>
    </div>
  );
}
