import { useContext, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from "../styles";
import { GameContext } from "../services/Context";
import { onValue, ref } from "firebase/database";
import { database } from "../services/firebaseConfig";
import { Card } from "@rneui/base";
import ScoreChart from "../components/ScoreChart";
import { Overlay } from "@rneui/themed";

export default function Scoreboard({ route, navigation }) {
  const { game } = useContext(GameContext);
  const [score, setScore] = useState();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);


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

  const sortedScore = score ? score.sort((a, b) => countSum(b[1]) - countSum(a[1])) : null

  const toggleOverlay = (item) => {
    let newArr = [];
    Object.values(item[1]).map(i => {
      let dataItem = ({
        stacks: [
          { value: i.score.creative, color: '#4a148c' },
          { value: i.score.performance, color: '#6a1b9a' },
          { value: i.score.song, color: '#8e24aa' },
          { value: i.score.spectacle, color: '#ab47bc' },
          { value: i.score.vocal, color: '#ba68c8' },
        ],
        label: i.user
      })
      newArr.push(dataItem);
    })
    setData(newArr);
    setVisible(!visible);
  }

  return (
    <View style={styles.container}>
      <Text>Scoreboard</Text>
      {score ?
        <FlatList
          data={sortedScore}
          renderItem={({ item }) =>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => toggleOverlay(item)}>
                <Card
                  containerStyle={{
                    alignItems: 'center',
                    padding: 10,
                    width: 200
                  }}>
                  <Card.Title>{item[0]}</Card.Title>
                  <Card.Divider />
                  <Text>Current total: {countSum(item[1])}</Text>
                </Card>
              </TouchableOpacity>
              <Overlay
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                overlayStyle={{ height: '70%', width: '90%', justifyContent: 'center' }}
              >
                <ScoreChart data={data} />
              </Overlay>
            </View>
          }
        />
        :
        <Text>Give points on performances to see scoreboard</Text>}
    </View>
  )
}
