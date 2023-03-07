import { VISITABLE_CELL_TYPES } from "../Utility/constants";
import Algorithm from "./AlgorithmTemplate";
import { AllColorMapping, CellId } from "../Utility/types";
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
    console.log("REACHED");
    const targetCellId = this.graph.getTargetCellId();
    if (targetCellId) {
      var currentNodeInShortestPath: Node | null =
        this.graph.getNode(targetCellId);
      console.log("ASDFFDSAFSF", currentNodeInShortestPath);
      while (currentNodeInShortestPath) {
        if (
          currentNodeInShortestPath.getCellType() !== AllColorMapping.Source &&
          currentNodeInShortestPath.getCellType() !== AllColorMapping.Target
        ) {
          console.log(
            currentNodeInShortestPath.getCellType(),
            AllColorMapping.Source,
            AllColorMapping.Target
          );
          this.graph.updateCellColor(
            currentNodeInShortestPath.getCellId(),
            AllColorMapping.Path
          );
        }

        var previouslyVisitedCellId =
          currentNodeInShortestPath.getPreviouslyVisitedCellId();
        console.log("PREV", previouslyVisitedCellId);
        if (previouslyVisitedCellId) {
          currentNodeInShortestPath = this.graph.getNode(
            previouslyVisitedCellId
          );
        } else {
          currentNodeInShortestPath = null;
        }
      }
    }
    console.log("REACHED2");
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
    frontier.unshift(node);
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
    console.log("INSIDE GETNEIGHBOURS", currentCellId);
    // Bit ugly, and repetitive. Could refactor.

    if (currentY + 1 < graphHeight) {
      console.log("HEIGHT", graphHeight);
      console.log("before 1");
      var neighbour = graph.getNode({ y: currentY + 1, x: currentX });
      console.log(1, neighbour);
      //neighbour.setPreviouslyVisitedCellId(currentCellId);
      neighbours.push(neighbour);
      console.log("1");
    }
    if (currentY - 1 >= 0) {
      var neighbour = graph.getNode({ y: currentY - 1, x: currentX });
      console.log(2, neighbour);
      //neighbour.setPreviouslyVisitedCellId(currentCellId);
      neighbours.push(neighbour);
      console.log("2");
    }
    if (currentX + 1 < graphWidth) {
      var neighbour = graph.getNode({ y: currentY, x: currentX + 1 });
      console.log(3, neighbour);
      //neighbour.setPreviouslyVisitedCellId(currentCellId);
      neighbours.push(neighbour);
      console.log("3");
    }
    if (currentX - 1 >= 0) {
      var neighbour = graph.getNode({ y: currentY, x: currentX - 1 });
      console.log(4, neighbour);
      //neighbour.setPreviouslyVisitedCellId(currentCellId);
      neighbours.push(neighbour);
      console.log("4");
    }
    return neighbours;
  }

  findPath() {
    var sourceCellId = this.graph.getSourceCellId();
    var targetCellId = this.graph.getTargetCellId();
    var graphHeight = this.graph.getGraphHeight();
    var graphWidth = this.graph.getGraphWidth();

    if (!sourceCellId || !targetCellId) {
      console.log("SOURCE TARGET", sourceCellId, targetCellId);
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

    while (frontier.length > 0) {
      // Pop from frontier and mark as visited
      var currentNode = this.popFromFrontier(frontier, frontierMap);
      currentNode?.setIsVisited(true);
      if (!currentNode) break; // Shouldn't need this but lang server wasn't happy
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

      var neighbourNodes = shuffle(
        this.getNeighbours(
          this.graph,
          currentY,
          currentX,
          graphHeight,
          graphWidth
        )
      );

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
    console.log(expanded);
    this.setExpanded(expanded);
    /*
    const source = document.getElementById(
      `${this.sourceCellId.height}-${this.sourceCellId.width}`
    );
    console.log(source);
    fringe.push(source);
  var cell = document.getElementById("3-2");
  if (cell) {
    //cell.classList.remove(AllColorMapping.Unvisited);
    //cell.classList.add(AllColorMapping.Wall);
  }
    */
  }
}
