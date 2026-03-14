import type { AttackType } from '../types/monster';

const CHIP_COLORS: Record<AttackType, string> = {
  P: 'bg-red-600 text-white',
  S: 'bg-blue-600 text-white',
  T: 'bg-green-600 text-white',
};

const CHIP_LABELS: Record<AttackType, string> = {
  P: 'P',
  S: 'S',
  T: 'T',
};

interface PatternChipProps {
  type: AttackType;
  onClick?: () => void;
  title?: string;
}

export function PatternChip({ type, onClick, title }: PatternChipProps) {
  const base = 'inline-flex items-center justify-center w-7 h-7 rounded font-bold text-sm select-none';
  const interactive = onClick ? 'cursor-pointer hover:opacity-75 transition-opacity' : '';

  return (
    <span
      className={`${base} ${CHIP_COLORS[type]} ${interactive}`}
      onClick={onClick}
      title={title}
    >
      {CHIP_LABELS[type]}
    </span>
  );
}
