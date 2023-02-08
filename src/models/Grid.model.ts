export type RotationAngle = -270 | -180 | -90 | -45 | 0 | 45 | 90 | 180 | 270;

export enum ConstructionType {
  ROAD = "Road",
  HOUSE = "House",
}

export interface Road extends Construction {
  type: ConstructionType.ROAD;
  withCrossing?: boolean;
  isRightTurn?: boolean;
  isLeftTurn?: boolean;
}
export interface House extends Construction {
  type: ConstructionType.HOUSE;
  name?: string;
}
export interface Construction {
  type: ConstructionType;
  rotation?: RotationAngle;
}

export interface GridTile {
  isEmpty: boolean;
  construction?: House | Road;
}

export type Grid = Array<Array<GridTile | null>>;
