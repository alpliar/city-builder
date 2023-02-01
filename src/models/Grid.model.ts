export interface Construction {
  name: string;
  height: number;
  color: number;
}

export interface GridTile {
  construction?: Construction;
}

export type Grid = Array<Array<GridTile | null>>;
