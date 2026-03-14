import type { AttackType } from '../types/monster';
import { PatternChip } from './PatternChip';

const ATTACK_TYPES: AttackType[] = ['P', 'S', 'T'];

const ADD_BUTTON_COLORS: Record<AttackType, string> = {
  P: 'bg-red-700 hover:bg-red-600 text-white',
  S: 'bg-blue-700 hover:bg-blue-600 text-white',
  T: 'bg-green-700 hover:bg-green-600 text-white',
};

const ADD_BUTTON_LABELS: Record<AttackType, string> = {
  P: 'Power',
  S: 'Speed',
  T: 'Technical',
};

interface PatternBuilderProps {
  label: string;
  pattern: AttackType[];
  onChange: (pattern: AttackType[]) => void;
}

export function PatternBuilder({ label, pattern, onChange }: PatternBuilderProps) {
  const add = (type: AttackType) => onChange([...pattern, type]);
  const remove = (index: number) => onChange(pattern.filter((_, i) => i !== index));
  const clear = () => onChange([]);

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>

      <div className="flex gap-2 mb-3">
        {ATTACK_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => add(type)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${ADD_BUTTON_COLORS[type]}`}
          >
            + {ADD_BUTTON_LABELS[type]}
          </button>
        ))}
        {pattern.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors ml-auto"
          >
            Clear
          </button>
        )}
      </div>

      <div className="min-h-[2rem] flex flex-wrap gap-1 bg-slate-900 rounded-lg p-2">
        {pattern.length === 0 ? (
          <span className="text-slate-600 text-sm self-center">No moves added yet</span>
        ) : (
          pattern.map((type, i) => (
            <PatternChip
              key={i}
              type={type}
              onClick={() => remove(i)}
              title="Click to remove"
            />
          ))
        )}
      </div>
      {pattern.length > 0 && (
        <p className="text-xs text-slate-500 mt-1">Click a chip to remove it</p>
      )}
    </div>
  );
}
