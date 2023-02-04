export interface CellId {
  x: number;
  y: number;
}

export enum SinglePlaceableColorMapping {
  Source = "bg-green-500",
  Target = "bg-red-500",
}

export enum MultiplePlaceableColorMapping {
  Weight = "bg-gray-500",
  Wall = "bg-zinc-800",
}

export type PlaceableColorMapping =
  | SinglePlaceableColorMapping
  | MultiplePlaceableColorMapping;
export const PlaceableColorMapping = {
  ...SinglePlaceableColorMapping,
  ...MultiplePlaceableColorMapping,
};

export enum UnplaceableColorMapping {
  Unvisited = "bg-white",
  Visited = "bg-blue-500",
  Path = "bg-yellow-500",
}

export type AllColorMapping = PlaceableColorMapping | UnplaceableColorMapping;
export const AllColorMapping = {
  ...PlaceableColorMapping,
  ...UnplaceableColorMapping,
};
