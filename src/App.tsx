import { useAuth } from './hooks/useAuth';
import { useMonsters } from './hooks/useMonsters';
import { Login } from './components/Login';
import { MonsterList } from './components/MonsterList';

function AuthenticatedApp({ onLogout }: { onLogout: () => void }) {
  const { monsters, loading, addMonster, updateMonster, deleteMonster } = useMonsters();
  return (
    <MonsterList
      monsters={monsters}
      loading={loading}
      onAdd={addMonster}
      onUpdate={updateMonster}
      onDelete={deleteMonster}
      onLogout={onLogout}
    />
  );
}

export default function App() {
  const { user, loading: authLoading, login, logout } = useAuth();

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

  return <AuthenticatedApp onLogout={logout} />;
}
