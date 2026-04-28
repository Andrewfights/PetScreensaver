export enum BlockingIntensity {
  REMINDER = 'Reminder',
  SOFT_BLOCK = 'Soft Block',
  GATEKEEPER = 'Gatekeeper',
  HARD_BREAK = 'Hard Break'
}

export interface PetProfile {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  processedImageUrl: string | null;
  settings: PetVisualSettings;
}

export interface PetVisualSettings {
  size: number; // 0-100
  opacity: number; // 0-100
  position: 'center' | 'bottom' | 'random';
  edgeSoftness: number;
}

export interface BreakSettings {
  intervalMinutes: number;
  durationSeconds: number;
  intensity: BlockingIntensity;
  dimBackground: boolean;
  clickBlocking: boolean;
}

export type AppState = 'onboarding' | 'dashboard' | 'playing';
