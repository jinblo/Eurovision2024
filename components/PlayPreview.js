import { Audio } from "expo-av";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from "react";

export default function PlayPreview({ url }) {
  const [icon, setIcon] = useState('play');
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    sound.current.loadAsync({ uri: url })
  }, []);

  async function playSound() {
    if (icon === 'play') {
      await sound.current.playAsync();
      setIcon('pause');
    } else {
      await sound.current.pauseAsync();
      setIcon('play');
    }
  }

  return (
    <Ionicons name={icon} onPress={() => playSound(url)} size={20} style={{ padding: 5 }} />
  )
}

