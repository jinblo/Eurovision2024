import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { styles } from "../styles";
import { GameContext } from "../services/Context";
import { onValue, ref } from "firebase/database";
import { database } from "../firebaseConfig";
import { Button, Card } from "@rneui/base";

export default function Scoreboard({ route, navigation }) {
  const { game } = useContext(GameContext);
  const [score, setScore] = useState();

  useEffect(() => {
    onValue(ref(database, `/games/${game}`), (snapshot) => {
      const snap = Object.entries(snapshot.val())
      setScore(snap)
    })
  }, []);

  const countSum = (item) => {
    let sum = 0
    sum = Object.values(item).map(i => sum + i.score.total)
      .reduce((total, value) => total + value)
    return sum
  }

  const sortedScore = score.sort((a, b) => countSum(b[1]) - countSum(a[1]))

  return (
    <View style={styles.container}>
      <Text>Scoreboard</Text>
      {score ?
        <FlatList
          data={sortedScore}
          renderItem={({ item }) =>
            <View style={{ flexDirection: 'row' }}>
              <Card
                containerStyle={{
                  alignItems: 'center',
                  padding: 10,
                  width: '90%'
                }}>
                <Card.Title>{item[0]}</Card.Title>
                <Card.Divider />
                <Text>Current total: {countSum(item[1])}</Text>
              </Card>
            </View>
          }
        />
        :
        <Text>Give points on performances to see scoreboard</Text>}
    </View>
  )
}
