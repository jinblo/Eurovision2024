import { TouchableOpacity, View } from "react-native";
import { Card, Text } from '@rneui/themed';
import { styles } from "../styles";
import QRCode from 'react-native-qrcode-svg';
import { useContext } from "react";
import { GameContext } from "../services/Context";



function ShareGame({ route, navigation }) {
  const { game, setGame } = useContext(GameContext);
  const url = `${game}`

  const exitGame = () => {
    setGame(null)
    navigation.navigate('Play', { screen: 'Game' })
  }

  return (
    <View style={styles.container}>
      <Text h4 style={{ margin: 30, textAlign: 'center' }}>
        Share QRCode or gamecode for others to join
      </Text>
      <QRCode value={url} size={200} />
      <Text
        selectable={true}
        h4
        style={{ margin: 30, textAlign: 'center', color: 'red' }}>
        {game}
      </Text>
      <TouchableOpacity
        onPress={exitGame}
        style={{ width: '85%' }}
      >
        <Card
          containerStyle={{
            alignItems: 'center',
            padding: 30,
          }}>
          <Text>Exit the current game</Text>
        </Card>
      </TouchableOpacity>
    </View>
  )
}

export default ShareGame;