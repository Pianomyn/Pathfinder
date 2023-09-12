import {CellId} from "./types"

export function createCellId(y: number, x: number): CellId{
  return {y: y, x: x}
}

export function cellIdIsEqual(first: CellId | null, second: CellId | null): boolean {
  if (!first || !second) {
    return false;
  }
  return first.y == second.y && first.x === second.x;
}
