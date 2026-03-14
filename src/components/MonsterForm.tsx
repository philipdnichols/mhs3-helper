import { useState, type FormEvent } from 'react';
import type { Monster, MonsterInput, AttackType, AttackMode } from '../types/monster';
import { MONSTER_TYPES } from '../types/monster';
import { AttackSelector } from './AttackSelector';

interface MonsterFormProps {
  initial?: Monster;
  onSave: (input: MonsterInput) => void;
  onCancel: () => void;
}

export function MonsterForm({ initial, onSave, onCancel }: MonsterFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [type, setType] = useState<MonsterInput['type']>(initial?.type ?? MONSTER_TYPES[0]);
  const [normalAttack, setNormalAttack] = useState<AttackType | null>(initial?.normalAttack ?? null);
  const [enragedAttack, setEnragedAttack] = useState<AttackType | null>(initial?.enragedAttack ?? null);
  const [extraModes, setExtraModes] = useState<AttackMode[]>(initial?.extraModes ?? []);
  const [error, setError] = useState('');

  const addMode = () => setExtraModes([...extraModes, { label: '', attack: null }]);

  const updateMode = (index: number, patch: Partial<AttackMode>) =>
    setExtraModes(extraModes.map((m, i) => (i === index ? { ...m, ...patch } : m)));

  const removeMode = (index: number) =>
    setExtraModes(extraModes.filter((_, i) => i !== index));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Monster name is required.');
      return;
    }
    const invalidMode = extraModes.find((m) => !m.label.trim());
    if (invalidMode !== undefined) {
      setError('All extra modes must have a label.');
      return;
    }
    onSave({ name: name.trim(), type, normalAttack, enragedAttack, extraModes });
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
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <AttackSelector label="Normal Attack" value={normalAttack} onChange={setNormalAttack} />
            <AttackSelector label="Enraged Attack" value={enragedAttack} onChange={setEnragedAttack} />

            {/* Extra Modes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Extra Modes</label>
                <button
                  type="button"
                  onClick={addMode}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  + Add Mode
                </button>
              </div>

              {extraModes.length === 0 ? (
                <p className="text-xs text-slate-600">No extra modes. Click + Add Mode if needed.</p>
              ) : (
                <div className="space-y-4">
                  {extraModes.map((mode, i) => (
                    <div key={i} className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="text"
                          value={mode.label}
                          onChange={(e) => updateMode(i, { label: e.target.value })}
                          placeholder="e.g. Overheated (Throat)"
                          className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeMode(i)}
                          className="text-slate-500 hover:text-red-400 transition-colors text-lg leading-none"
                          aria-label="Remove mode"
                        >
                          ✕
                        </button>
                      </div>
                      <AttackSelector
                        label="Attack"
                        value={mode.attack}
                        onChange={(attack) => updateMode(i, { attack })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Save
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
