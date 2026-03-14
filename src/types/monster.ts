export type AttackType = 'P' | 'S' | 'T';

export const ATTACK_TYPE_LABELS: Record<AttackType, string> = {
  P: 'Power',
  S: 'Speed',
  T: 'Technical',
};

export const MONSTER_TYPES = [
  'Amphibian',
  'Bird Wyvern',
  'Brute Wyvern',
  'Carapaceon',
  'Elder Dragon',
  'Fanged Beast',
  'Fanged Wyvern',
  'Flying Wyvern',
  'Herbivore',
  'Leviathan',
  'Piscine Wyvern',
  'Temnoceran',
] as const;

export type MonsterType = (typeof MONSTER_TYPES)[number];

export interface Monster {
  id: string;
  name: string;
  type: MonsterType;
  normalPattern: AttackType[];
  enragedPattern: AttackType[];
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: number;
}

export type MonsterInput = Pick<Monster, 'name' | 'type' | 'normalPattern' | 'enragedPattern'>;
