export interface CellId {
  height: number;
  width: number;
}

export enum PlaceableColorMapping {
  Source = "bg-green-500",
  Target = "bg-red-500",
  Weight = "bg-gray-500",
  Wall = "bg-zinc-800",
}

export enum UnplaceableColorMapping {
  Unvisited = "bg-white",
  Visited = "bg-blue-500",
}

export type AllColorMapping = PlaceableColorMapping | UnplaceableColorMapping;
export const AllColorMapping = {
  ...PlaceableColorMapping,
  ...UnplaceableColorMapping,
};
