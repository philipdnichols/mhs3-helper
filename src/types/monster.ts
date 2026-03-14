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
  'Small Monster',
  'Temnoceran',
] as const;

export type MonsterType = (typeof MONSTER_TYPES)[number];

export interface Monster {
  id: string;
  name: string;
  type: MonsterType;
  normalAttack: AttackType | null;
  enragedAttack: AttackType | null;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: number;
}

export type MonsterInput = Pick<Monster, 'name' | 'type' | 'normalAttack' | 'enragedAttack'>;
