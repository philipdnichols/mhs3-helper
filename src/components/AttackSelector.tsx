import type { AttackType } from '../types/monster';

const BUTTON_COLORS: Record<AttackType, { base: string; active: string }> = {
  P: { base: 'border-red-700 text-red-400 hover:bg-red-900/40', active: 'bg-red-600 border-red-600 text-white' },
  S: { base: 'border-blue-700 text-blue-400 hover:bg-blue-900/40', active: 'bg-blue-600 border-blue-600 text-white' },
  T: { base: 'border-green-700 text-green-400 hover:bg-green-900/40', active: 'bg-green-600 border-green-600 text-white' },
};

const LABELS: Record<AttackType, string> = {
  P: 'Power',
  S: 'Speed',
  T: 'Technical',
};

const TYPES: AttackType[] = ['P', 'S', 'T'];

interface AttackSelectorProps {
  label: string;
  value: AttackType | null;
  onChange: (value: AttackType | null) => void;
}

export function AttackSelector({ label, value, onChange }: AttackSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="flex gap-2">
        {TYPES.map((type) => {
          const active = value === type;
          const colors = active ? BUTTON_COLORS[type].active : BUTTON_COLORS[type].base;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(active ? null : type)}
              className={`flex-1 py-2 rounded-lg border font-semibold text-sm transition-colors ${colors}`}
            >
              {LABELS[type]}
            </button>
          );
        })}
      </div>
      {!value && <p className="text-xs text-slate-500 mt-1">Select one</p>}
    </div>
  );
}
