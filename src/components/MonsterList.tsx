import { useState } from 'react';
import type { Monster, MonsterInput, MonsterType, AttackType } from '../types/monster';
import { MONSTER_TYPES } from '../types/monster';
import { PatternChip } from './PatternChip';
import { MonsterForm } from './MonsterForm';

interface MonsterListProps {
  monsters: Monster[];
  loading: boolean;
  onAdd: (input: MonsterInput) => Promise<unknown>;
  onUpdate: (id: string, input: MonsterInput) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
  onLogout: () => void;
}

export function MonsterList({
  monsters,
  loading,
  onAdd,
  onUpdate,
  onDelete,
  onLogout,
}: MonsterListProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<MonsterType | ''>('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Monster | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Monster | null>(null);

  const filtered = monsters.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === '' || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAdd = (input: MonsterInput) => {
    setShowForm(false);
    onAdd(input);
  };

  const handleUpdate = (input: MonsterInput) => {
    if (!editing) return;
    setEditing(null);
    onUpdate(editing.id, input);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    await onDelete(confirmDelete.id);
    setConfirmDelete(null);
  };

  const ModeRow = ({ label, value }: { label: string; value: AttackType | null }) => (
    <div className="flex items-center gap-2">
      <span className="text-slate-500 text-xs w-36 shrink-0 truncate" title={label}>{label}</span>
      {value ? <PatternChip type={value} /> : <span className="text-slate-600">—</span>}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">MHS3 Monster Tracker</h1>
        <button
          onClick={onLogout}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search monsters…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 pr-8 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-56"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as MonsterType | '')}
            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Types</option>
            {MONSTER_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button
            onClick={() => setShowForm(true)}
            className="ml-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            + Add Monster
          </button>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-slate-500">
            {monsters.length === 0 ? 'No monsters yet. Add one!' : 'No monsters match your search.'}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-slate-800 text-slate-400 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Attack Modes</th>
                  <th className="px-4 py-3 font-medium sr-only">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filtered.map((monster) => (
                  <tr key={monster.id} className="bg-slate-900 hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-3 font-medium text-white align-top">{monster.name}</td>
                    <td className="px-4 py-3 text-slate-400 align-top">{monster.type}</td>
                    <td className="px-4 py-3 align-top">
                      <div className="space-y-1">
                        <ModeRow label="Normal" value={monster.normalAttack} />
                        <ModeRow label="Enraged" value={monster.enragedAttack} />
                        {monster.extraModes.map((mode, i) => (
                          <ModeRow key={i} label={mode.label} value={mode.attack} />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditing(monster)}
                          className="text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setConfirmDelete(monster)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-slate-600 text-xs mt-4">
          {filtered.length} of {monsters.length} monsters
        </p>
      </main>

      {showForm && <MonsterForm onSave={handleAdd} onCancel={() => setShowForm(false)} />}
      {editing && (
        <MonsterForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-2">Delete Monster?</h2>
            <p className="text-slate-400 mb-6">
              Are you sure you want to delete{' '}
              <span className="text-white font-medium">{confirmDelete.name}</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-700 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
