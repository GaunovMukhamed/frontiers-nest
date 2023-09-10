export interface MainStats {
  strength: number;
  agility: number;
  intelligence: number;
  charisma: number;
}

export interface CharacterCreationInfo {
  gender: string[],
  races: RaceInfo[]
}

export interface RaceInfo extends MainStats {
  name: string;
  description: string;
  img: string;
}