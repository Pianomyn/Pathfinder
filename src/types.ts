export interface CellId {
  height: number;
  width: number;
}

export enum CellColorMapping {
  // Should rename values to tailwind classes
  SOURCE = "success",
  TARGET = "danger",
  UNVISITED = "light",
  VISITED = "primary",
  WEIGHT = "secondary",
  WALL = "dark",
}
