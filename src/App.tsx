import { useAuth } from './hooks/useAuth';
import { useMonsters } from './hooks/useMonsters';
import { Login } from './components/Login';
import { MonsterList } from './components/MonsterList';

export default function App() {
  const { user, loading: authLoading, login, logout } = useAuth();
  const { monsters, loading: monstersLoading, addMonster, updateMonster, deleteMonster } =
    useMonsters();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={login} />;
  }

  return (
    <MonsterList
      monsters={monsters}
      loading={monstersLoading}
      onAdd={addMonster}
      onUpdate={updateMonster}
      onDelete={deleteMonster}
      onLogout={logout}
    />
  );
}
