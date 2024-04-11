import { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@rneui/themed';
import Rating from "./Rating";
import { styles } from "../styles";

export default function JuryView({ route, navigation }) {
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

  const calcTotal = () => {
    setTotal({
      ...total,
      song: song,
      spectalcle: spectalcle,
      vocal: vocal,
      creative: creative,
      performance: performance,
      total: (song + spectalcle + vocal + creative + performance).toFixed(0)
    })
  }

  useEffect(() => {
    calcTotal()
  }, [song, spectalcle, vocal, creative, performance])

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
    </View>
  )
}

