import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { View } from "react-native";
import { Input, Button, Text } from '@rneui/themed';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, { displayName: username })
          .then(ok => {
            console.log("updated")
            navigation.navigate('Play', { screen: 'Game' });
          })
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      })
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '85%' }}>
        <Input
          label="EMAIL"
          textContentType="emailAddress"
          autoCapitalize="none"
          keyboardType="email-address"
          inputStyle={{ width: 80 }}
          onChangeText={text => setEmail(text)}
        />
        <Input
          label="PASSWORD"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <Input
          label="USERNAME"
          onChangeText={text => setUsername(text)}
        />
        <Button
          size="lg"
          onPress={register}>Register</Button>
        <Text
          style={{ margin: 10, marginTop: 20 }}
          size="lg"
          onPress={() => navigation.navigate("Login")}>Login here</Text>
      </View>
    </View>
  )

}
