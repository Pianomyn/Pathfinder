/*
 * This component renders the Algorithm selection dropdown, the height input and the width input.
 */
import BFS from "../Algorithms/BFS";
import DFS from "../Algorithms/DFS";
import {
  ALL_COLOR_MAPPINGS,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
} from "../Utility/constants";
import { CellId } from "../Utility/types";
import Algorithm from "../Algorithms/AlgorithmTemplate";
import Graph from "../Algorithms/Graph/Graph";

function setHeightOrWidth(
  newDimension: string,
  isHeight: boolean,
  setDimension: (value: number) => void,
  setHideError: (value: boolean) => void
) {
  if (!newDimension) {
    isHeight ? setDimension(DEFAULT_HEIGHT) : setDimension(DEFAULT_WIDTH);
    setHideError(true);
  } else if (newDimension.match(/^[1-9][0-9]*$/)) {
    const newDimensionInt = parseInt(newDimension);
    if (newDimensionInt > 100) {
      setHideError(false);
    } else {
      setDimension(newDimensionInt);
      setHideError(true);
    }
  } else {
    setHideError(false);
  }
}

interface SettingsBarProps {
  setHeight: (value: number) => void;
  setWidth: (value: number) => void;
  hideInputError: boolean;
  setHideInputError: (value: boolean) => void;
  height: number;
  width: number;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  setCurrentAlgorithm: (value: Algorithm) => void; // TODO: fix type later
  graph: Graph;
}

const SettingsBar = ({
  setHeight,
  setWidth,
  hideInputError,
  setHideInputError,
  height,
  width,
  sourceCellId,
  targetCellId,
  setCurrentAlgorithm,
  graph,
}: SettingsBarProps) => {
  var bfs = new BFS(graph);
  var dfs = new DFS(graph);

  type algorithmMappingType = { [key: string]: Algorithm };
  var algorithmMapping: algorithmMappingType = {
    BFS: bfs,
    DFS: dfs,
  };

  return (
    <div className="flex flex-col items-center mx-2">
      <div className="flex items-center justify-center ">
        <select
          className="p-2 mx-0.5 w-4/12 text-center border-solid border"
          onChange={(event) => {
            var algorithmName = event.target.value;
            setCurrentAlgorithm(algorithmMapping[algorithmName]);
          }}
        >
          <option disabled>---- Unweighted ----</option>
          <option value="BFS">BFS</option>
          <option value="DFS">DFS</option>
          <option disabled>---- Weighted ----</option>
          <option>Djikstra's Algorithm</option>
          <option>A*</option>
        </select>
        <input
          className="p-2 mx-0.5 w-4/12 border-solid border "
          type="text"
          placeholder={`Height (${DEFAULT_HEIGHT})`}
          onChange={(e) => {
            setHeightOrWidth(
              e.target.value,
              true,
              setHeight,
              setHideInputError
            );
            graph.clearGraph(Object.values(ALL_COLOR_MAPPINGS));
          }}
        ></input>
        <input
          className="p-2 mx-0.5 w-4/12 border-solid border "
          type="text"
          placeholder={`Width (${DEFAULT_WIDTH})`}
          onChange={(e) => {
            setHeightOrWidth(
              e.target.value,
              false,
              setWidth,
              setHideInputError
            );
            graph.clearGraph(Object.values(ALL_COLOR_MAPPINGS));
          }}
        ></input>
      </div>
      {hideInputError ? (
        <></>
      ) : (
        <small className="text-center text-red-500">
          Height and Width must be integer values between 1 and 100 inclusive.
        </small>
      )}
    </div>
  );
};

export default SettingsBar;
