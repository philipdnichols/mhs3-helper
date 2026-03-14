import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBWd0zIe4SwfsFVwSvLmlY5SEWXsdcp154',
  authDomain: 'mhs3-helper.firebaseapp.com',
  projectId: 'mhs3-helper',
  storageBucket: 'mhs3-helper.firebasestorage.app',
  messagingSenderId: '294109513564',
  appId: '1:294109513564:web:49cffd356d8446e66a2399',
  measurementId: 'G-FM23ZZQ5RV',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
