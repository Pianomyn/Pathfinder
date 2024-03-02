import { CellId } from "../Utility/types";
import Algorithm from "./AlgorithmTemplate";
import Graph from "./Graph/Graph";
import Node from "./Graph/Node";
import { Heap } from "heap-js";
import { cellIdIsEqual, createCellId } from "../Utility/CellId";
import { ALL_COLOR_MAPPINGS } from "../Utility/constants";

export default class GreedyHeuristic extends Algorithm {
  minHeap: Heap<[number, CellId]>; // Cost is measured in manhattan dist to target

  constructor(graph: Graph, animationDelay: number) {
    super(graph);
    this.animationDelay = animationDelay;
    this.minHeap = new Heap((a, b) => a[0] - b[0]);
  }

  reset() {
    this.minHeap.clear()
  }

  setGraph(graph: Graph) {
    this.graph = graph;
  }

  setAnimationDelay(animationDelay: number) {
    this.animationDelay = animationDelay;
  }

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
  }

  findPath() {
    var sourceCellId = this.graph.getSourceCellId();
    var targetCellId = this.graph.getTargetCellId();

    if (!sourceCellId || !targetCellId) {
      window.alert(
        "Please make sure both a source and target cell have been placed"
      );
      return;
    }

    this.minHeap.add([0, sourceCellId]);
    this.graph.getNode(sourceCellId).setIsVisited(true);

    while (!this.minHeap.isEmpty()) {
      const pair = this.minHeap.pop();
      if (pair === undefined) {
        // Not necessary, but TS interpreter complains
        break;
      }
      const [cost, currCoords] = pair;

      // Visit current node
      this.expanded.push(this.graph.getNode(currCoords));

      if (cellIdIsEqual(currCoords, targetCellId)) {
        break;
      }

      // Add node neighbours
      this.getNeighbours(currCoords).forEach((neighbour) => {
        if (targetCellId === null) return; // Not sure why TS interpreter needs this.
        const newCost =
          Math.abs(targetCellId.y - neighbour.y) +
          Math.abs(targetCellId.x - neighbour.x);
        this.minHeap.push([newCost, neighbour]);
        this.graph.getNode(neighbour).setIsVisited(true);
        this.graph.getNode(neighbour).setPreviouslyVisitedCellId(currCoords);
      });
    }
  }

  getNeighbours(coords: CellId) {
    const dirs = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    var validNeighbours: CellId[] = [];

    dirs.forEach((d) => {
      var newX = coords.x + d[0];
      var newY = coords.y + d[1];

      if (
        newX >= 0 &&
        newX < this.graph.getGraphWidth() &&
        newY >= 0 &&
        newY < this.graph.getGraphHeight() &&
        !this.graph.getNode(createCellId(newY, newX)).getIsVisited() &&
        !this.graph.getNode(createCellId(newY, newX)).getIsWall()
      ) {
        validNeighbours.push({ y: newY, x: newX });
      }
    });

    return validNeighbours;
  }
}
