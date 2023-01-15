export type CellId = {
  height: number;
  width: number;
};

export enum CellColorMapping {
  SOURCE = "success",
  TARGET = "danger",
  UNVISITED = "light",
  VISITED = "primary",
  WEIGHT = "secondary",
  WALL = "dark",
}
