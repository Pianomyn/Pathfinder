import Cell from "./Cell";
import { CellId } from "../types";
import React from "react";

const Grid = ({ height, width }: CellId) => {
  var a = 0;

  function generateRow(width: number, height: number) {
    var cells: Cell[] = [];
    for (var w = 0; w < width; w++) {
      cells.push(<Cell id={{ width: w, height: height }} />);
    }
    return <tr> {cells} </tr>;
  }

  function generateTable(width: number, height: number) {
    var table = <table id="grid"></table>;
    var rows: JSX.Element[] = [];
    for (var h = 0; h < height; h++) {
      //var row = <tr id={`grid-row-${h}`}></tr>;
      var currentRow = generateRow(width, h);
      rows.push(currentRow);
    }
    return <table>{rows}</table>;
  }
  return <div>{generateTable(width, height)}</div>;
};

export default Grid;
