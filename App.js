import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebaseConfig';
import { useEffect, useState } from 'react';
import Router from './services/Router';
import { GameContext } from './services/Context';


export default function App() {
  const [user, setUser] = useState();
  const [game, setGame] = useState();

  const stateHandler = user => {
    setUser(user);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, stateHandler);
    return unsubscribe;
  }, []);

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <Router user={user} />
    </GameContext.Provider>
  );
}
