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
      <h1 className="text-2xl text-center">Pathfinder test</h1>
      <div id="options bar" className="flex flex-row justify-center">
        {/* Should move this to a OptionsBar Component */}
        <div className="flex flex-column w-2/12">
          <div className="flex flex-row justify-center w-full">
            <input
              className="p-2 m-3 w-3/12 border-solid"
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
            <input
              className="p-2 m-3 w-3/12 border-solid"
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
          </div>
          <small
            hidden={hideHeightWidthError}
            className="text-center text-red-500"
          >
            Height and width must be an integer larger than 0
          </small>
        </div>
      </div>
      <div className="grid-div">
        <Grid height={height} width={width} />
      </div>
    </div>
  );
}
