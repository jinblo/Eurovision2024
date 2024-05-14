import { useContext, useEffect, useState } from "react";
import { View } from 'react-native';
import { Button, Card, Text } from '@rneui/themed';
import Rating from "../components/Rating";
import { styles } from "../styles";
import { onValue, ref, set } from "firebase/database";
import { auth, database } from "../services/firebaseConfig";
import { GameContext } from "../services/Context";
import { useTheme } from "@react-navigation/native";


export default function JuryView({ route, navigation }) {
  const { colors } = useTheme();
  const { game } = useContext(GameContext);
  const user = auth.currentUser.displayName;
  const uid = auth.currentUser.uid;
  const participant = route.params.item[1];
  const [song, setSong] = useState(0);
  const [spectacle, setSpectacle] = useState(0);
  const [vocal, setVocal] = useState(0);
  const [creative, setCreative] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [score, setScore] = useState({
    song: 0,
    spectacle: 0,
    vocal: 0,
    creative: 0,
    performance: 0,
    total: 0
  });
  const [saved, setSaved] = useState('');

  const calcTotal = () => {
    setScore({
      ...score,
      song: song,
      spectacle: spectacle,
      vocal: vocal,
      creative: creative,
      performance: performance,
      total: (song + spectacle + vocal + creative + performance)
    })
  }

  useEffect(() => {
    onValue(ref(database, `/games/${game}/${participant.country}/${uid}`), (snapshot) => {
      const data = snapshot.val()
      if (data != null) {
        setSong(data.score.song)
        setSpectacle(data.score.spectacle)
        setVocal(data.score.vocal)
        setCreative(data.score.creative)
        setPerformance(data.score.performance)
      }
    })
  }, [])

  useEffect(() => {
    calcTotal()
  }, [song, spectacle, vocal, creative, performance])

  const saveScore = () => {
    const data = {
      user: user,
      score: score
    }
    set(ref(database, `/games/${game}/${participant.country}/${uid}`), data)
      .then(res => {
        setSaved("Tallennettu")
      })
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={{ width: '80%', alignItems: 'center', marginBottom: 50, backgroundColor: '#b2ebf2', padding: 40 }}>
        <Card.Title>{participant.country}</Card.Title>
        <Card.Divider></Card.Divider>
        <Text h4>{participant.artist} - {participant.song}</Text>
      </Card>
      <Rating setRate={setSong} text="Song" score={song} />
      <Rating setRate={setSpectacle} text="Spectacle" score={spectacle} />
      <Rating setRate={setVocal} text="Vocal skills" score={vocal} />
      <Rating setRate={setCreative} text="Creativity" score={creative} />
      <Rating setRate={setPerformance} text="Performance" score={performance} />
      <Text>Total: {score.total}</Text>
      <Button onPress={saveScore} color={colors.primary} >Save</Button>
      <Text>{saved}</Text>
    </View>
  )
}

