import "./App.css";

import Grid from "./Grid/Grid";
import React, { useState } from "react";

const DEFAULT_HEIGHT_OR_WIDTH = 30;

export default function App() {
  const [width, setWidth] = useState<number>(DEFAULT_HEIGHT_OR_WIDTH);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT_OR_WIDTH);
  const [hideHeightWidthError, setHideHeightWidthError] =
    useState<boolean>(true);

  function setHeightOrWidth(
    value: string,
    setDimension: (value: number) => void,
    setHideError: (value: boolean) => void
  ) {
    if (!value) {
      setDimension(DEFAULT_HEIGHT_OR_WIDTH);
      setHideError(true);
    } else if (value.match(/^[1-9][0-9]*$/)) {
      setDimension(parseInt(value));
      setHideError(true);
    } else {
      setHideError(false);
    }
  }

  return (
    <div className="app">
      <h1 className="text-2xl mt-2 text-center">Pathfinder</h1>
      <div id="options bar" className="flex flex-row justify-center">
        {/* Should move this to a OptionsBar Component */}
        <div className="flex flex-column w-2/12">
          <div className="flex flex-row justify-center w-full">
            <select className="p-2 w-3/12 mx-0.5 mt-3 text-center">
              <option>BFS</option>
              <option>DFS</option>
              <option>IDDFS</option>
              <option>A*</option>
              <option>Greedy</option>
            </select>
            <input
              className="p-2 mt-3 mx-0.5 w-3/12 border-solid text-center"
              type="text"
              placeholder="Height"
              onChange={(e) => {
                setHeightOrWidth(
                  e.target.value,
                  setHeight,
                  setHideHeightWidthError
                );
              }}
            ></input>
            <input
              className="p-2 mt-3 mx-0.5 w-3/12 border-solid text-center"
              type="text"
              placeholder="Width"
              onChange={(e) => {
                setHeightOrWidth(
                  e.target.value,
                  setWidth,
                  setHideHeightWidthError
                );
              }}
            ></input>
          </div>
          {hideHeightWidthError ? (
            <small className="text-white">Hidden Message</small>
          ) : (
            <small className="text-center text-red-500">
              Height and width must be an integer larger than 0
            </small>
          )}
        </div>
      </div>
      <div className="grid-div">
        <Grid height={height} width={width} />
      </div>
    </div>
  );
}
