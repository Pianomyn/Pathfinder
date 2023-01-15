export type CellId = {
  width: number;
  height: number;
};

export enum CellColorMapping {
  SOURCE = "success",
  TARGET = "danger",
  UNVISITED = "light",
  VISITED = "primary",
  WEIGHT = "secondary",
  WALL = "dark",
}
