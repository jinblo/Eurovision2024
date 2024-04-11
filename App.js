import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './services/firebaseConfig';
import { useEffect, useState } from 'react';
import Router from './services/Router';


export default function App() {
  const auth = getAuth(app);
  const [user, setUser] = useState();

  const stateHandler = user => {
    setUser(user);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, stateHandler);
    return unsubscribe;
  }, []);

  return (
    <Router user={user} />
  );
}
