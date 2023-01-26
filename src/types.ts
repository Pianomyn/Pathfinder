export interface CellId {
  height: number;
  width: number;
}

export enum CellColorMapping {
  // Should rename values to tailwind classes
  Source = "bg-green-500",
  Target = "bg-red-500",
  Unvisited = "bg-white",
  Visited = "bg-blue-500",
  Weight = "bg-gray-500",
  Wall = "bg-zinc-800",
}
