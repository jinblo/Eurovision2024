import { TouchableOpacity, View } from "react-native";
import { Card, Text } from '@rneui/themed';
import { styles } from "../styles";
import { useContext, useEffect, useState } from "react";
import { push, ref } from "firebase/database";
import { auth, database } from "../firebaseConfig";
import ShareGame from "./ShareGame";
import { GameContext } from "../services/Context";


function Game({ route, navigation }) {
  const { game, setGame } = useContext(GameContext)
  const player = auth.currentUser.displayName;

  const createNewGame = () => {
    console.log("new game")
    push(ref(database, '/games'), player)
      .then((response) => {
        setGame(response.toString().substr(-20))
        navigation.navigate('GameMode', { screen: 'Share' })
      })
  }



  return (
    <View style={styles.container}>
      <Text h4 style={{ margin: 50, color: '#8B008B' }}>Player: {player.username}</Text>
      <Text h2>Select game mode</Text>
      <TouchableOpacity
        onPress={createNewGame}
        style={{ width: '85%' }}
      >
        <Card
          containerStyle={{
            alignItems: 'center',
            marginTop: 50,
            padding: 30,
            backgroundColor: 'hotpink',
            borderColor: 'black'
          }}>
          <Card.Title h4 style={{ color: 'black' }}>Create</Card.Title>
          <Card.Divider color="black" />
          <Text>Create a new game</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log("join game")}
        style={{ width: '85%' }}
      >
        <Card
          containerStyle={{
            alignItems: 'center',
            marginTop: 50,
            marginBottom: 100,
            padding: 30,
            backgroundColor: 'orange',
            borderColor: 'black'
          }}>
          <Card.Title h4 style={{ color: 'black' }}>Join</Card.Title>
          <Card.Divider color="black" />
          <Text>Join a game</Text>
        </Card>
      </TouchableOpacity>
    </View >
  )
}

export default Game;