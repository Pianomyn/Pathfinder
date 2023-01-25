import { DEFAULT_HEIGHT_OR_WIDTH } from "../App";

interface SettingsBarProps {
  setHeight: (value: number) => void;
  setWidth: (value: number) => void;
  hideInputError: boolean;
  setHideInputError: (value: boolean) => void;
}

function setHeightOrWidth(
  newDimension: string,
  setDimension: (value: number) => void,
  setHideError: (value: boolean) => void
) {
  if (!newDimension) {
    setDimension(DEFAULT_HEIGHT_OR_WIDTH);
    setHideError(true);
  } else if (newDimension.match(/^[1-9][0-9]*$/)) {
    setDimension(parseInt(newDimension));
    setHideError(true);
  } else {
    setHideError(false);
  }
}

const SettingsBar = ({
  setHeight,
  setWidth,
  hideInputError,
  setHideInputError,
}: SettingsBarProps) => {
  return (
    <div className="flex flex-column w-2/12">
      <div className="flex flex-row justify-center w-full">
        <select className="p-2 w-4/12 mx-0.5 mt-3 text-center border  rounded">
          <option>BFS</option>
          <option>DFS</option>
          <option>IDDFS</option>
          <option>A*</option>
          <option>Greedy</option>
        </select>
        <input
          className="p-2 mt-3 mx-0.5 w-3/12 border-solid border rounded"
          type="text"
          placeholder="H"
          onChange={(e) => {
            setHeightOrWidth(e.target.value, setHeight, setHideInputError);
          }}
        ></input>
        <input
          className="p-2 mt-3 mx-0.5 w-3/12 border-solid border rounded"
          type="text"
          placeholder="W"
          onChange={(e) => {
            setHeightOrWidth(e.target.value, setWidth, setHideInputError);
          }}
        ></input>
      </div>
      {hideInputError ? (
        <small className="text-white">Hidden Message</small>
      ) : (
        <small className="text-center text-red-500">
          Height and width must be an integer larger than 0
        </small>
      )}
    </div>
  );
};

export default SettingsBar;
