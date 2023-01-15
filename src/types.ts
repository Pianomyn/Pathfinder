export interface CellId {
  x: number;
  y: number;
}

export enum CellTypeColorMapping {
  SOURCE = "lightgreen",
  TARGET = "lightcoral",
  UNVISITED = "white",
  VISITED = "cornflowerblue",
  WEIGHT = "grey",
  WALL = "black",
}
