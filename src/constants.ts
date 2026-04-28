import { BlockingIntensity, BreakSettings, PetProfile } from "./types";

export const DEFAULT_PE_PROFILE: PetProfile = {
  id: 'default',
  name: 'Buddy',
  type: 'Dog',
  imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60',
  processedImageUrl: null,
  settings: {
    size: 65,
    opacity: 100,
    position: 'bottom',
    edgeSoftness: 5
  }
};

export const DEFAULT_BREAK_SETTINGS: BreakSettings = {
  intervalMinutes: 25,
  durationSeconds: 300, // 5 minutes
  intensity: BlockingIntensity.GATEKEEPER,
  dimBackground: false,
  clickBlocking: true
};

export const PET_TYPES = ['Cat', 'Dog', 'Bird', 'Rabbit', 'Reptile', 'Horse', 'Other'];
