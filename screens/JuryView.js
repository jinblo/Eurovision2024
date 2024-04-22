import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from '@rneui/themed';
import Rating from "../components/Rating";
import { styles } from "../styles";
import { get, onValue, push, ref, set } from "firebase/database";
import { auth, database } from "../firebaseConfig";
import { GameContext } from "../services/Context";
import { getAuth } from "firebase/auth";



export default function JuryView({ route, navigation }) {
  const { game } = useContext(GameContext);
  const user = auth.currentUser.displayName;
  const participant = route.params.item[1];
  const [song, setSong] = useState(0);
  const [spectalcle, setSpectacle] = useState(0);
  const [vocal, setVocal] = useState(0);
  const [creative, setCreative] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [total, setTotal] = useState({
    song: 0,
    spectalcle: 0,
    vocal: 0,
    creative: 0,
    performance: 0,
    total: 0
  });
  const [saved, setSaved] = useState('');

  const calcTotal = () => {
    setTotal({
      ...total,
      song: song,
      spectalcle: spectalcle,
      vocal: vocal,
      creative: creative,
      performance: performance,
      total: (song + spectalcle + vocal + creative + performance)
    })
  }

  useEffect(() => {
    calcTotal()
  }, [song, spectalcle, vocal, creative, performance])

  const saveScore = () => {
    const data = {
      user: user,
      score: total
    }
    /* Tarkoituksena hakea maan pistetaulukko, ja tarkastaa onko käyttäjä jo antanut maalle pisteitä
    findIndex?
    onValue(ref(database, `/games/${game}/${participant.country}`), (snapshot) => {
      let snap = Object.entries(snapshot.val())
      console.log("snap", snap)
      console.log(snap.flat().filter(item => item.user === user))
      for (let x of snap) {
        if (x.user === user) {
          console.log(x)
        }
      }
    })*/
    push(ref(database, `/games/${game}/${participant.country}`), data)
      .then(res => {
        setSaved("Tallennettu")
      })
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={{ width: '80%', alignItems: 'center', marginBottom: 50 }}>
        <Card.Title>{participant.country}</Card.Title>
        <Card.Divider></Card.Divider>
        <Text>flag here</Text>
        <Text h4>{participant.artist} - {participant.song}</Text>
      </Card>
      <Rating setRate={setSong} text="Song" />
      <Rating setRate={setSpectacle} text="Spectacle" />
      <Rating setRate={setVocal} text="Vocal skills" />
      <Rating setRate={setCreative} text="Creativity" />
      <Rating setRate={setPerformance} text="Performance" />
      <Text>Total: {total.total}</Text>
      <Button onPress={saveScore}>Save</Button>
      <Text>{saved}</Text>
    </View>
  )
}

