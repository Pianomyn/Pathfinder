import { CellId } from "../Utility/types";
import Graph from "./Graph/Graph";
import Node from "./Graph/Node";

export default abstract class Algorithm {
  graph: Graph;
  expanded: Node[];
  animationDelay: number;
  // Previously visited
  // Weight
  // Heuristic

  constructor(graph: Graph) {
    this.graph = graph;
    this.expanded = [];
    this.animationDelay = 20;
  }

  setGraph(graph: Graph) {
    this.graph = graph;
  }
  setAnimationDelay(animationDelay: number) {
    this.animationDelay = animationDelay;
  }
  abstract findPath(): void;
  // Returns the timeout before board can be edited again
  abstract animatePath(args: any[]): void;
}
