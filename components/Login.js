import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { Alert, View } from "react-native";
import { Input, Button, Text } from '@rneui/themed';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Performances");
      })
      .catch(error => {
        console.error(error)
        alert("Login failed")
      })
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '85%' }}>
        <Input
          label="EMAIL"
          textContentType="emailAddress"
          keyboardType="email-address"
          inputStyle={{ width: 80 }}
          onChangeText={text => setEmail(text)}
        />
        <Input
          label="PASSWORD"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <Button
          color="green"
          size="lg"
          onPress={login}>Login</Button>
        <Text
          style={{ margin: 10, marginTop: 20 }}
          size="lg"
          onPress={() => navigation.navigate("Register")}>Register here</Text>
      </View>
    </View>
  )

}
