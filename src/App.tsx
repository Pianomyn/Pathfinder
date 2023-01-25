import "./App.css";

import Grid from "./Grid/Grid";
import PlayBar from "./MenuBar/PlayBar";
import SettingsBar from "./MenuBar/SettingsBar";
import ColorKeyBar from "./MenuBar/ColorKeyBar";
import React, { useState } from "react";

export const DEFAULT_HEIGHT_OR_WIDTH = 30;

export default function App() {
  const [width, setWidth] = useState<number>(DEFAULT_HEIGHT_OR_WIDTH);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT_OR_WIDTH);
  const [hideInputError, setHideInputError] = useState<boolean>(true);

  return (
    <div className="app">
      <h1 className="text-2xl mt-2 text-center">Pathfinder</h1>
      <div id="options bar" className="flex flex-row justify-center">
        {/* Should move this to a OptionsBar Component */}
        <SettingsBar
          setHeight={setHeight}
          setWidth={setWidth}
          hideInputError={hideInputError}
          setHideInputError={setHideInputError}
        />
        <PlayBar />
        <ColorKeyBar />
      </div>
      <div className="grid-div">
        <Grid height={height} width={width} />
      </div>
    </div>
  );
}
