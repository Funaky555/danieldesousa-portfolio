export type Tool = 'select' | 'line' | 'arrow' | 'run' | 'triangle' | 'rect' | 'eraser';
export type TeamType = 'A' | 'B';
export type PlayerType = 'player' | 'goalkeeper';
export type FieldView = 'full' | 'half-left' | 'half-right' | 'area-left' | 'area-right';
export type FormationName = '4-3-3' | '4-4-2' | '4-2-3-1' | '3-5-2';

export interface Point {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  team: TeamType;
  type: PlayerType;
  number: number;
  name: string;
  x: number;
  y: number;
  visible: boolean;
}

export interface Ball {
  x: number;
  y: number;
}

export interface Drawing {
  id: string;
  tool: Exclude<Tool, 'select' | 'eraser'>;
  start: Point;
  end: Point;
  color: string;
}

export interface Keyframe {
  id: string;
  label: string;
  players: Player[];
  ball: Ball;
}

export interface BoardSnapshot {
  players: Player[];
  ball: Ball;
  drawings: Drawing[];
}

export interface ViewBounds {
  viewX: number;
  viewY: number;
  viewW: number;
  viewH: number;
}
