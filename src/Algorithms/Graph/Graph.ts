import { CellId } from "../../Utility/types";
import Node from "./Node";

export default class Graph {
  height: number;
  width: number;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  graph: Node[][];

  constructor(
    height: number,
    width: number,
    sourceCellId: CellId | null,
    targetCellId: CellId | null
  ) {
    this.height = height;
    this.width = width;
    this.sourceCellId = sourceCellId;
    this.targetCellId = targetCellId;
    this.graph = this.generateGraph(height, width);
  }

  // Getters
  getNode(height: number, width: number): Node {
    return this.graph[height][width];
  }

  generateGraph(height: number, width: number): Node[][] {
    var graph: Node[][] = [];
    for (var h = 0; h < height; h++) {
      var row: Node[] = [];
      for (var w = 0; w < width; w++) {
        // Check if source or target node
        // if (sourceCellId)
        // if (targetCellId)
        // const cellId = {height: h, width: w}
        row.push(new Node());
      }
      graph.push(row);
    }
    return graph;
  }
}
