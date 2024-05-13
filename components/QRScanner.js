import { Button, Text } from '@rneui/base';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GameContext } from '../services/Context';

export default function QRScanner({ route, navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { setGame } = useContext(GameContext);

  useEffect(() => {
    requestPermission();
  }, [])

  const handleScanned = ({ data }) => {
    setScanned(true);
    setGame(data);
    navigation.navigate('GameMode', { screen: 'Share' })
  }

  if (!permission) {
    return <View />
  }
  if (!permission.granted) {
    return (
      <View>
        <Text>Camera permission not granted</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }
  return (
    <CameraView
      style={{ flex: 1 }}
      facing='back'
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      onBarcodeScanned={scanned ? undefined : handleScanned}
    />
  )
}
