import "./App.css";
import Graph from "./Algorithms/Graph/Graph";

import { DEFAULT_HEIGHT, DEFAULT_WIDTH, PLACEABLE_COLOR_MAPPINGS } from "./Utility/constants";
import { CellId, PLACEABLE_COLOR_MAPPINGS_TYPE } from "./Utility/types";
import Grid from "./Grid/Grid";
import PlayBar from "./MenuBar/PlayBar";
import SettingsBar from "./MenuBar/SettingsBar";
import ColorKeyBar from "./MenuBar/ColorKeyBar";
import { useEffect, useState } from "react";
import BFS from "./Algorithms/BFS";
import Algorithm from "./Algorithms/AlgorithmTemplate";

export default function App() {
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
  const [hideInputError, setHideInputError] = useState<boolean>(true);

  const [currentCellTypeToPlace, setCurrentCellTypeToPlace] =
    useState<PLACEABLE_COLOR_MAPPINGS_TYPE | null>(null);
  const [sourceCellId, setSourceCellId] = useState<CellId | null>(null);
  const [targetCellId, setTargetCellId] = useState<CellId | null>(null);
  const [graph, setGraph] = useState(
    new Graph(
      height,
      width,
      sourceCellId,
      targetCellId,
      setSourceCellId,
      setTargetCellId
    )
  );

  //graph = new Graph(height, width, sourceCellId, targetCellId);

  const [canEdit, setCanEdit] = useState<boolean>(true);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<Algorithm>(
    new BFS(graph)
  );

  useEffect(() => {
    setSourceCellId(null);
    setTargetCellId(null);
    //graph = new Graph(height, width, null, null);
    setGraph(
      new Graph(height, width, null, null, setSourceCellId, setTargetCellId)
    );
  }, [height, width]);

  useEffect(() => {
    graph.setSourceCellId(sourceCellId);
    graph.setTargetCellId(targetCellId);
  }, [sourceCellId, targetCellId]);

  return (
    <div className="font-sans">
      <h1 className="text-2xl mt-2 text-center">Pathfinder</h1>
      <div id="options-bar-wrapper" className="w-screen flex justify-center">
        <div
          id="options-bar"
          className="flex w-screen items-start justify-center my-3"
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
            setCurrentAlgorithm={setCurrentAlgorithm}
            graph={graph}
          />
          <PlayBar
            graph={graph}
            canEdit={canEdit}
            setCanEdit={setCanEdit}
            currentAlgorithm={currentAlgorithm}
          />
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
