import {
  ALL_COLOR_MAPPINGS,
  VISITABLE_COLOR_MAPPINGS,
} from "../Utility/constants";
import Algorithm from "./AlgorithmTemplate";
import { CellId } from "../Utility/types";
import Graph from "./Graph/Graph";
import Node from "./Graph/Node";
import { cellIdIsEqual } from "../Utility/CellId";

export default class BFS extends Algorithm {
  constructor(graph: Graph) {
    super(graph);
    this.animationDelay = 6;
  }

  // Setters
  setExpanded(expanded: Node[]) {
    this.expanded = expanded;
  }

  async animatePath() {
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
    this.setExpanded([]);
  }

  insertIntoFrontier(frontier: Node[], node: Node): void {
    frontier.push(node);
  }

  popFromFrontier(frontier: Node[]): Node | null {
    var nodeToReturn = frontier.shift();
    return nodeToReturn !== undefined ? nodeToReturn : null;
  }

  getNeighbours(
    graph: Graph,
    currentY: number,
    currentX: number,
    graphHeight: number,
    graphWidth: number
  ): Node[] {
    var neighbours: Node[] = [];
    // Bit ugly, and repetitive. Could refactor.

    if (currentY + 1 < graphHeight) {
      var neighbour = graph.getNode({ y: currentY + 1, x: currentX });
      neighbours.push(neighbour);
    }
    if (currentY - 1 >= 0) {
      var neighbour = graph.getNode({ y: currentY - 1, x: currentX });
      neighbours.push(neighbour);
    }
    if (currentX + 1 < graphWidth) {
      var neighbour = graph.getNode({ y: currentY, x: currentX + 1 });
      neighbours.push(neighbour);
    }
    if (currentX - 1 >= 0) {
      var neighbour = graph.getNode({ y: currentY, x: currentX - 1 });
      neighbours.push(neighbour);
    }
    return neighbours;
  }

  findPath() {
    var sourceCellId = this.graph.getSourceCellId();
    var targetCellId = this.graph.getTargetCellId();
    var graphHeight = this.graph.getGraphHeight();
    var graphWidth = this.graph.getGraphWidth();

    if (!sourceCellId || !targetCellId) {
      window.alert(
        "Please make sure both a source and target cell have been placed"
      );
      return;
    }
    //const sourceCellId = this.graph.getSourceCellId()

    var expanded: Node[] = [];
    var frontier: Node[] = [];
    this.insertIntoFrontier(frontier, this.graph.getNode(sourceCellId));

    while (frontier.length > 0) {
      // Pop from frontier and mark as visited
      var currentNode = this.popFromFrontier(frontier);
      currentNode?.setIsVisited(true);
      if (!currentNode) break; // Shouldn't need this but lang server wasn't happy
      // Insert into expanded
      expanded.push(currentNode);
      // Check if popped node is target
      if (
        cellIdIsEqual(currentNode.getCellId(), this.graph.getTargetCellId())
      ) {
        break;
      }

      // Find neighbours
      var neighbourNodes = this.getNeighbours(
        this.graph,
        currentNode.getCellY(),
        currentNode.getCellX(),
        graphHeight,
        graphWidth
      );

      // Update neighbours, frontier
      neighbourNodes.forEach((n) => {
        if (
          !cellIdIsEqual(n.getCellId(), this.graph.getSourceCellId())
          && !n.getIsWall()
          && !n.getIsVisited()
        ) {
          // @ts-ignore Saying currentNode might be null. Already checked if null
          n.setPreviouslyVisitedCellId(currentNode.getCellId());
          n.setIsVisited(true);
          this.insertIntoFrontier(frontier, n);
        }
      });
    }
    this.setExpanded(expanded);
  }
}
