import { ALL_COLOR_MAPPINGS, VISITABLE_COLOR_MAPPINGS } from "../Utility/constants";
import { cellIdIsEqual } from "../Utility/CellId";
import Algorithm from "./AlgorithmTemplate";
import {  CellId } from "../Utility/types";
import Graph from "./Graph/Graph";
import Node from "./Graph/Node";

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: Array<Node>) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default class DFS extends Algorithm {
  random;
  constructor(graph: Graph, random: boolean) {
    super(graph);
    this.animationDelay = 20;
    this.random = random;
  }
  // Setters
  setExpanded(expanded: Node[]) {
    this.expanded = expanded;
  }

  async animatePath(args: any[]) {
    const [setCanEdit] = args;
    setCanEdit(false)
    // Animate expanded cells
    for (let node of this.expanded) {
      //const nodeCellId = node.getCellId()
      if (
        !cellIdIsEqual(node.getCellId(), this.graph.getSourceCellId())
        && !cellIdIsEqual(node.getCellId(), this.graph.getTargetCellId())
      ) {
        this.graph.updateCellColor(node.getCellId(), ALL_COLOR_MAPPINGS.Visited);
        await new Promise((resolve) =>
          setTimeout(resolve, this.animationDelay)
        );
      }
    }

    // Animate path
    const targetCellId = this.graph.getTargetCellId();
    if (targetCellId) {
      var currentNodeInShortestPath: Node | null =
        this.graph.getNode(targetCellId);
      while (currentNodeInShortestPath) {
        if (
        !cellIdIsEqual(currentNodeInShortestPath.getCellId(), this.graph.getSourceCellId())
        && !cellIdIsEqual(currentNodeInShortestPath.getCellId(), this.graph.getTargetCellId())
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
    this.setExpanded([]);
    setCanEdit(true)
  }

  insertIntoFrontier(
    frontier: Node[],
    node: Node
  ): void {
    /*
     * Insert the node into the 'frontier' array.
     * */
    frontier.unshift(node);
  }

  popFromFrontier(
    frontier: Node[],
  ): Node | null {
    var nodeToReturn = frontier.shift();
    if (!nodeToReturn) return null;

    return nodeToReturn;
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
      //neighbour.setPreviouslyVisitedCellId(currentCellId);
      neighbours.push(neighbour);
    }
    if (currentY - 1 >= 0) {
      var neighbour = graph.getNode({ y: currentY - 1, x: currentX });
      //neighbour.setPreviouslyVisitedCellId(currentCellId);
      neighbours.push(neighbour);
    }
    if (currentX + 1 < graphWidth) {
      var neighbour = graph.getNode({ y: currentY, x: currentX + 1 });
      //neighbour.setPreviouslyVisitedCellId(currentCellId);
      neighbours.push(neighbour);
    }
    if (currentX - 1 >= 0) {
      var neighbour = graph.getNode({ y: currentY, x: currentX - 1 });
      //neighbour.setPreviouslyVisitedCellId(currentCellId);
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
    this.insertIntoFrontier(
      frontier,
      this.graph.getNode(sourceCellId)
    );

    while (frontier.length > 0) {
      // Pop from frontier and mark as visited
      var currentNode = this.popFromFrontier(frontier);
      currentNode?.setIsVisited(true);
      if (!currentNode) break; // Shouldn't need this but lang server wasn't happy
      // Insert into expanded
      expanded.push(currentNode);
      // Check if popped node is target
      if (cellIdIsEqual(currentNode.getCellId(), this.graph.getTargetCellId())) {
        break;
      }

      // Set previously visited Cell Id for neighbours
      // Check neighbours aren't walls
      // and insert neighbours into frontier
      var currentY = currentNode.getCellY();
      var currentX = currentNode.getCellX();

      var neighbourNodes = 
        this.getNeighbours(
          this.graph,
          currentY,
          currentX,
          graphHeight,
          graphWidth
      );
      if (this.random) neighbourNodes = shuffle(neighbourNodes)

      neighbourNodes.forEach((n) => {
        if (
          !cellIdIsEqual(n.getCellId(), this.graph.getSourceCellId())
          && !n.getIsWall()
          && !n.getIsVisited()
        ) {
          // @ts-ignore Saying currentNode might be null. Already checked if null
          n.setPreviouslyVisitedCellId(currentNode.getCellId());
          this.insertIntoFrontier(frontier, n);
        }
      });

      //var currentNodeHeight = currentNode.height
    }
    this.setExpanded(expanded);
  }
}

