import { useState, type FormEvent } from 'react';
import type { Monster, MonsterInput, AttackType } from '../types/monster';
import { MONSTER_TYPES } from '../types/monster';
import { PatternBuilder } from './PatternBuilder';

interface MonsterFormProps {
  initial?: Monster;
  onSave: (input: MonsterInput) => Promise<void>;
  onCancel: () => void;
}

export function MonsterForm({ initial, onSave, onCancel }: MonsterFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [type, setType] = useState<MonsterInput['type']>(initial?.type ?? MONSTER_TYPES[0]);
  const [normalPattern, setNormalPattern] = useState<AttackType[]>(initial?.normalPattern ?? []);
  const [enragedPattern, setEnragedPattern] = useState<AttackType[]>(initial?.enragedPattern ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Monster name is required.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      await onSave({ name: name.trim(), type, normalPattern, enragedPattern });
    } catch {
      setError('Failed to save. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            {initial ? 'Edit Monster' : 'Add Monster'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rathalos"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MonsterInput['type'])}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                {MONSTER_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <PatternBuilder
              label="Normal Attack Pattern"
              pattern={normalPattern}
              onChange={setNormalPattern}
            />

            <PatternBuilder
              label="Enraged Attack Pattern"
              pattern={enragedPattern}
              onChange={setEnragedPattern}
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
