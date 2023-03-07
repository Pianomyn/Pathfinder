import BFS from "../Algorithms/BFS";
import DFS from "../Algorithms/DFS";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../Utility/constants";
import { CellId } from "../Utility/types";
import Algorithm from "../Algorithms/AlgorithmTemplate";
import { AlgorithmType } from "../Algorithms/AlgorithmTypes";
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
  setCurrentAlgorithm: (value: AlgorithmType) => void; // TODO: fix type later
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
  return (
    <div className="flex flex-col items-center mx-2">
      <div className="flex items-center justify-center ">
        <select className="p-2 mx-0.5 w-4/12 text-center border-solid border rounded">
          <option
            onClick={() => {
              setCurrentAlgorithm(new BFS(graph));
            }}
          >
            BFS
          </option>
          <option onClick={() => setCurrentAlgorithm(new DFS(graph))}>
            DFS
          </option>
          {/*
          <option>IDDFS</option>
          <option>A*</option>
          <option>Greedy</option>
          */}
        </select>
        <input
          className="p-2 mx-0.5 w-4/12 border-solid border rounded"
          type="text"
          placeholder={`Height (${DEFAULT_HEIGHT})`}
          onChange={(e) => {
            setHeightOrWidth(
              e.target.value,
              true,
              setHeight,
              setHideInputError
            );
          }}
        ></input>
        <input
          className="p-2 mx-0.5 w-4/12 border-solid border rounded"
          type="text"
          placeholder={`Width (${DEFAULT_WIDTH})`}
          onChange={(e) => {
            setHeightOrWidth(
              e.target.value,
              false,
              setWidth,
              setHideInputError
            );
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
