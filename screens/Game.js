import { TouchableOpacity, View } from "react-native";
import { Button, Card, Input, Text } from '@rneui/themed';
import { styles } from "../styles";
import { useContext, useEffect, useState } from "react";
import { onValue, push, ref } from "firebase/database";
import { auth, database } from "../services/firebaseConfig";
import { GameContext } from "../services/Context";


function Game({ route, navigation }) {
  const { game, setGame } = useContext(GameContext)
  const player = auth.currentUser.displayName;
  const [allGames, setAllGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    onValue(ref(database, '/games'), (snapshot) => {
      setAllGames(Object.keys(snapshot.val()))
    })
  }, []);

  const createNewGame = () => {
    console.log("new game")
    push(ref(database, '/games'), player)
      .then((response) => {
        setGame(response.toString().substr(-20))
        navigation.navigate('GameMode', { screen: 'Share' })
      })
  }

  const joinGame = () => {
    if (game != null && allGames.includes(game)) {
      setErrorMessage('')
      navigation.navigate('GameMode', { screen: 'Share' })
    } else {
      setErrorMessage('Game code not valid')
    }
  }

  const readQR = () => {
    console.log("readQR")
    navigation.navigate('QR Scanner')
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
        onPress={joinGame}
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
          <View style={{ width: 200 }}>
            <Button onPress={readQR} title='Scan QR Code' />
            <Input
              label='GAME CODE'
              placeholder='Type in game code'
              onChangeText={text => setGame(text.trim())}
              value={game}
              renderErrorMessage={errorMessage != ''}
              errorMessage={errorMessage}
            />
          </View>
        </Card>
      </TouchableOpacity>
    </View >
  )
}

export default Game;