import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Monster, MonsterInput } from '../types/monster';

function sortMonsters(monsters: Monster[]): Monster[] {
  return [...monsters].sort((a, b) => {
    const aKey = (a.baseName || a.name).toLowerCase();
    const bKey = (b.baseName || b.name).toLowerCase();
    if (aKey !== bKey) return aKey.localeCompare(bKey);
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
}

export function useMonsters() {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'monsters'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          baseName: '',
          extraModes: [],
          ...d.data(),
          createdAt: d.data().createdAt?.toDate() ?? new Date(),
          updatedAt: d.data().updatedAt?.toDate() ?? new Date(),
        })) as unknown as Monster[];
        setMonsters(sortMonsters(data));
        setLoading(false);
      },
      (error) => {
        console.error('Firestore error:', error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const addMonster = (input: MonsterInput) =>
    addDoc(collection(db, 'monsters'), {
      ...input,
      schemaVersion: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

  const updateMonster = (id: string, input: MonsterInput) =>
    updateDoc(doc(db, 'monsters', id), {
      ...input,
      updatedAt: serverTimestamp(),
    });

  const deleteMonster = (id: string) => deleteDoc(doc(db, 'monsters', id));

  return { monsters, loading, addMonster, updateMonster, deleteMonster };
}
