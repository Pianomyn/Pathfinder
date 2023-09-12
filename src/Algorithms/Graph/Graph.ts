import { useEffect } from "react";
import { createCellId } from "../../Utility/CellId";
import { ALL_COLOR_MAPPINGS } from "../../Utility/constants";
import { ALL_COLOR_MAPPINGS_TYPE, CellId } from "../../Utility/types";
import Node from "./Node";

export default class Graph {
  height: number;
  width: number;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  graph: Node[][];
  setSourceCellId: (value: CellId | null) => void;
  setTargetCellId: (value: CellId | null) => void;

  constructor(
    height: number,
    width: number,
    sourceCellId: CellId | null,
    targetCellId: CellId | null,
    setSourceCellId: (value: CellId | null) => void,
    setTargetCellId: (value: CellId | null) => void
  ) {
    this.height = height;
    this.width = width;
    this.sourceCellId = sourceCellId;
    this.targetCellId = targetCellId;
    this.graph = this.generateGraph(height, width);
    this.setSourceCellId = setSourceCellId;
    this.setTargetCellId = setTargetCellId;
  }

  // Getters
  getGraphHeight() {
    return this.height;
  }

  getGraphWidth() {
    return this.width;
  }

  getSourceCellId(): CellId | null {
    return this.sourceCellId;
  }

  getTargetCellId(): CellId | null {
    return this.targetCellId;
  }

  getNode(cellId: CellId): Node {
    // Assumes x and y are valid
    const { y, x } = cellId;
    return this.graph[y][x];
  }

  getCell(cellId: CellId) {
    return document.getElementById(JSON.stringify(cellId));
  }

  updateCellColor(cellId: CellId, newColor: ALL_COLOR_MAPPINGS_TYPE) {
    // TODO: BAD. Responsibility for setting colors should be within grid.tsx
    // How else to animate cells in order?
    var cell = this.getCell(cellId);
    if (cell) {
      for (let element of cell.classList) {
        // @ts-ignore TODO: Fix typecasting
        if (Object.values(ALL_COLOR_MAPPINGS).includes(element)) {
          cell.classList.remove(element);
        }
      }
      cell.classList.add(newColor);
    }
  }

  // Setters
  updateSourceCellId(cellId: CellId | null) {
    this.sourceCellId = cellId;
  }

  updateTargetCellId(cellId: CellId | null) {
    this.targetCellId = cellId;
  }

  resetGraph(
    clearWallsAndWeights: boolean,
    clearPath: boolean,
    clearSourceAndTarget: boolean
  ): Set<CellId> {
    /*
     * Resets any nodes that match the filter parameters.
     *
     * Returns all CellIds that were reset.
     */
    var updatedCellIds: Set<CellId> = new Set();

    for (var r = 0; r < this.height; r++) {
      for (var c = 0; c < this.width; c++) {
        var currentId = createCellId(r, c);
        var currentNode = this.getNode(currentId);

        if (
          clearWallsAndWeights &&
          (currentNode.getIsWeight() || currentNode.getIsWall())
        ) {
          currentNode.setIsWeight(false);
          currentNode.setIsWall(false);
          updatedCellIds.add(currentId);
        }
        if (
          clearPath && currentNode.getIsVisited()
        ) {
          currentNode.setIsVisited(false);
          updatedCellIds.add(currentId);
        }
        if (
          clearSourceAndTarget
        ) {
          if(this.sourceCellId != null) {
            updatedCellIds.add(currentId);
            this.sourceCellId = null;
          }
          else if(this.targetCellId != null) {
            updatedCellIds.add(currentId);
            this.targetCellId = null;
          }
        }
      }
    }
    return updatedCellIds
  }

  generateGraph(height: number, width: number): Node[][] {
    var graph: Node[][] = [];
    for (var y = 0; y < height; y++) {
      var row: Node[] = [];
      for (var x = 0; x < width; x++) {
        // Check if source or target node
        var newNode = new Node({ y: y, x: x });
        if (
          this.sourceCellId &&
          this.sourceCellId.y === y &&
          this.sourceCellId.x === x
        ) {
          //newNode.isSource = true;
        } else if (
          this.targetCellId &&
          this.targetCellId.y === y &&
          this.targetCellId.x === x
        ) {
          //newNode.isTarget = true;
        }
        row.push(newNode);
      }
      graph.push(row);
    }
    return graph;
  }
}
