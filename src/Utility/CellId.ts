import {CellId} from "./types"

export function createCellId(y: number, x: number): CellId{
  return {y: y, x: x}
}

export function cellIdIsEqual(first: CellId, second: CellId): boolean {
  return JSON.stringify(first) === JSON.stringify(second)
}
