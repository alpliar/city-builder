import type { Color } from "three";

export interface Construction {
  name: string;
  height: number;
  width?: number;
  depth?: number;
  color: Color;
}

export interface GridTile {
  construction?: Construction;
}

export type Grid = Array<Array<GridTile | null>>;
