import { AllColorMapping } from "./types";

export const DEFAULT_HEIGHT = 20;
export const DEFAULT_WIDTH = 50;

export const ALL_CELL_TYPES: AllColorMapping[] = [
  AllColorMapping.Source,
  AllColorMapping.Target,
  AllColorMapping.Weight,
  AllColorMapping.Wall,
  AllColorMapping.Visited,
  AllColorMapping.Unvisited,
  AllColorMapping.Path,
];

export const VISITABLE_CELL_TYPES: AllColorMapping[] = [
  AllColorMapping.Weight,
  AllColorMapping.Target,
  AllColorMapping.Unvisited,
];

export const SOURCE_AND_TARGET: AllColorMapping[] = [
  AllColorMapping.Source,
  AllColorMapping.Target,
];

export const WALLS_AND_WEIGHTS: AllColorMapping[] = [
  AllColorMapping.Wall,
  AllColorMapping.Weight,
];
