import { VISITABLE_CELL_TYPES } from "../Utility/constants";
import Algorithm from "./AlgorithmTemplate";
import { AllColorMapping, CellId } from "../Utility/types";
import Graph from "./Graph/Graph";
import Node from "./Graph/Node";

export default class BFS extends Algorithm {
  constructor(graph: Graph) {
    super(graph);
    this.animationDelay = 3;
  }

  // Setters
  setExpanded(expanded: Node[]) {
    this.expanded = expanded;
  }

  async animatePath() {
    // Animate expanded cells
    for (let node of this.expanded) {
      //const nodeCellId = node.getCellId()
      if (
        node.getCellType() !== AllColorMapping.Source &&
        node.getCellType() !== AllColorMapping.Target
      ) {
        this.graph.updateCellColor(node.getCellId(), AllColorMapping.Visited);
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
          currentNodeInShortestPath.getCellType() !== AllColorMapping.Source &&
          currentNodeInShortestPath.getCellType() !== AllColorMapping.Target
        ) {
          this.graph.updateCellColor(
            currentNodeInShortestPath.getCellId(),
            AllColorMapping.Path
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

  insertIntoFrontier(
    frontier: Node[],
    frontierMap: Map<CellId, Node>,
    node: Node
  ): void {
    /*
     * Insert the node into the 'frontier' array. Also insert
     * the node into a Map to speed up ifExists checks.
     * */
    const cellId = node.getCellId();
    frontier.push(node);
    frontierMap.set(cellId, node); // Check if exists first?
  }

  popFromFrontier(
    frontier: Node[],
    frontierMap: Map<CellId, Node>
  ): Node | null {
    var nodeToReturn = frontier.shift();
    if (!nodeToReturn) return null;

    frontierMap.delete(nodeToReturn.getCellId());

    return nodeToReturn;
  }

  checkIfInFrontier(frontierMap: Map<CellId, Node>, node: Node): boolean {
    const cellId = node.getCellId();
    var nodeInFrontier = frontierMap.get(cellId);
    return nodeInFrontier !== undefined;
  }

  getNeighbours(
    graph: Graph,
    currentY: number,
    currentX: number,
    graphHeight: number,
    graphWidth: number
  ): Node[] {
    var neighbours: Node[] = [];
    var currentCellId = { y: currentY, x: currentX };
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
    var frontierMap = new Map<CellId, Node>(); // Index frontier entries to speed up ifExists check
    this.insertIntoFrontier(
      frontier,
      frontierMap,
      this.graph.getNode(sourceCellId)
    );
    console.log("FRONTIER", frontier);

    while (frontier.length > 0) {
      console.log("REACHED WHILE LOOP");
      // Pop from frontier and mark as visited
      var currentNode = this.popFromFrontier(frontier, frontierMap);
      currentNode?.setIsVisited(true);
      if (!currentNode) break; // Shouldn't need this but lang server wasn't happy
      console.log(currentNode);
      // Insert into expanded
      expanded.push(currentNode);
      // Check if popped node is target
      if (currentNode.getCellType() === AllColorMapping.Target) {
        break;
      }

      // Set previously visited Cell Id for neighbours
      // Check neighbours aren't walls
      // and insert neighbours into frontier
      var currentY = currentNode.getCellY();
      var currentX = currentNode.getCellX();

      var neighbourNodes = this.getNeighbours(
        this.graph,
        currentY,
        currentX,
        graphHeight,
        graphWidth
      );
      console.log("NEIGHBOURS", neighbourNodes);

      neighbourNodes.forEach((n) => {
        if (
          VISITABLE_CELL_TYPES.includes(n.getCellType()) &&
          !n.getIsVisited() &&
          !this.checkIfInFrontier(frontierMap, n)
        ) {
          // @ts-ignore Saying currentNode might be null. Already checked if null
          n.setPreviouslyVisitedCellId(currentNode.getCellId());
          this.insertIntoFrontier(frontier, frontierMap, n);
        }
      });

      //var currentNodeHeight = currentNode.height
    }
    this.setExpanded(expanded);
    console.log(expanded);
    /*
    const source = document.getElementById(
      `${this.sourceCellId.height}-${this.sourceCellId.width}`
    );
  var cell = document.getElementById("3-2");
  if (cell) {
    //cell.classList.remove(AllColorMapping.Unvisited);
    //cell.classList.add(AllColorMapping.Wall);
  }
    */
  }
}
