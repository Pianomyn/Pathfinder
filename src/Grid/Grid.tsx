import "./Grid.css";

import Cell from "./Cell";
import { CellId } from "../types";
import React from "react";

const Grid = ({ height, width }: CellId) => {
  var a = 0;

  function generateRow(width: number, h: number) {
    var cells: Cell[] = [];
    for (var w = 0; w < width; w++) {
      cells.push(<Cell key={`${w}-${h}`} id={{ width: w, height: h }} />);
    }
    return <tr key={`${h}`}>{cells}</tr>;
  }

  function generateTable(height: number, width: number) {
    var table = <table id="grid"></table>;
    var rows: JSX.Element[] = [];
    for (var h = 0; h < height; h++) {
      //var row = <tr id={`grid-row-${h}`}></tr>;
      var currentRow = generateRow(width, h);
      rows.push(currentRow);
    }
    return (
      <table className="grid">
        <tbody>{rows}</tbody>
      </table>
    );
  }
  return <>{generateTable(height, width)}</>;
};

export default Grid;
