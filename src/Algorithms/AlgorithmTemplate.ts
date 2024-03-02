import { cellIdIsEqual } from "../Utility/CellId";
import { ALL_COLOR_MAPPINGS } from "../Utility/constants";
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
  async animatePath(args: any[]) {
    const [setCanEdit] = args;
    setCanEdit(false);
    // Animate expanded cells
    for (let node of this.expanded) {
      if (
        !cellIdIsEqual(node.getCellId(), this.graph.getSourceCellId()) &&
        !cellIdIsEqual(node.getCellId(), this.graph.getTargetCellId())
      ) {
        this.graph.updateCellColor(
          node.getCellId(),
          ALL_COLOR_MAPPINGS.Visited
        );
        await new Promise((resolve) =>
          setTimeout(resolve, this.animationDelay)
        );
      }
    }

    // Animate shortest path
    const targetCellId = this.graph.getTargetCellId();
    if (targetCellId) {
      var currentNodeInShortestPath: Node | null =
        this.graph.getNode(targetCellId);
      while (currentNodeInShortestPath) {
        if (
          !cellIdIsEqual(
            currentNodeInShortestPath.getCellId(),
            this.graph.getSourceCellId()
          ) &&
          !cellIdIsEqual(
            currentNodeInShortestPath.getCellId(),
            this.graph.getTargetCellId()
          )
        ) {
          this.graph.updateCellColor(
            currentNodeInShortestPath.getCellId(),
            ALL_COLOR_MAPPINGS.Path
          );
          await new Promise((resolve) =>
            setTimeout(resolve, this.animationDelay)
          );
        }

        var previouslyVisitedCellId =
          currentNodeInShortestPath.getPreviouslyVisitedCellId();
        if (previouslyVisitedCellId) {
          currentNodeInShortestPath = this.graph.getNode(
            previouslyVisitedCellId
          );
        } else {
          currentNodeInShortestPath = null;
        }
      }
    }
    this.expanded = [];
    setCanEdit(true);
    this.reset();
  }

  abstract reset(): void;
}
