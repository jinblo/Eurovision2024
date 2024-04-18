import { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { styles } from "../styles";

export default function Scoreboard({ route, navigation }) {
  const [score, setScore] = useState();

  return (
    <View style={styles.container}>
      <Text>Scoreboard</Text>
    </View>
  )
}
