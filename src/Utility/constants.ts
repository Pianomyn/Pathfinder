export const DEFAULT_HEIGHT = 20;
export const DEFAULT_WIDTH = 50;

export const ALL_COLOR_MAPPINGS = {
  Source: "bg-green-500",
  Target: "bg-red-500",
  Weight: "bg-gray-500",
  Wall: "bg-zinc-800",
  Unvisited: "bg-white",
  Visited: "bg-blue-500",
  Path: "bg-yellow-500",
}

export const PLACEABLE_COLOR_MAPPINGS = {
  Source: ALL_COLOR_MAPPINGS.Source,
  Target: ALL_COLOR_MAPPINGS.Target,
  Weight: ALL_COLOR_MAPPINGS.Weight,
  Wall: ALL_COLOR_MAPPINGS.Wall,
};

export const UNPLACEABLE_COLOR_MAPPINGS = {
  Unvisited: ALL_COLOR_MAPPINGS.Unvisited,
  Visited: ALL_COLOR_MAPPINGS.Visited,
  Path: ALL_COLOR_MAPPINGS.Path,
};

export const VISITABLE_COLOR_MAPPINGS = {
  Weight: ALL_COLOR_MAPPINGS.Weight,
  Unvisited: ALL_COLOR_MAPPINGS.Unvisited,
  Target: ALL_COLOR_MAPPINGS.Target,
};

export const EXPLORED_COLOR_MAPPINGS = {
  Visited: ALL_COLOR_MAPPINGS.Visited,
  Path: ALL_COLOR_MAPPINGS.Path,
}


/*
export const ObstacleColorMappings = {
  Weight: ALL_COLOR_MAPPINGS.Visited,
  Wall: ALL_COLOR_MAPPINGS.Visited,
};
*/
