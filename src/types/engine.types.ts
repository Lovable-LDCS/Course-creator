// Engine Types
export type EngineType = 'engine1' | 'engine2' | 'engine3' | 'engine4';

export interface Engine {
  id: EngineType;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export interface EngineState {
  currentEngine: EngineType | null;
  processing: boolean;
  error: string | null;
}
