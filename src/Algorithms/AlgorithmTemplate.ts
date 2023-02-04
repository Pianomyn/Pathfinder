import { CellId } from "../Utility/types";
import Graph from "./Graph/Graph";
import Node from "./Graph/Node";

export default abstract class Algorithm {
  graph: Graph;
  expanded: Node[];
  // Previously visited
  // Weight
  // Heuristic

  constructor(graph: Graph) {
    this.graph = graph;
    this.expanded = [];
  }

  setGraph(graph: Graph) {
    this.graph = graph;
  }
  //returnShortestPath: () => void;
  //findShortestPath: () => void;
}
