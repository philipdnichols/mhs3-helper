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
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Monster, MonsterInput } from '../types/monster';

export function useMonsters() {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'monsters'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate() ?? new Date(),
        updatedAt: d.data().updatedAt?.toDate() ?? new Date(),
      })) as Monster[];
      setMonsters(data);
      setLoading(false);
    });
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
