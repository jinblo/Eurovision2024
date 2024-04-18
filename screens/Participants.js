import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue } from 'firebase/database';
import { View } from 'react-native';
import { FlatList } from "react-native";
import { ListItem } from '@rneui/base';
import { Button } from '@rneui/themed';
import { styles } from '../styles';


export default function Participants({ route, navigation }) {
  const client_id = process.env.EXPO_PUBLIC_SPOTIFY_CL_ID;
  const cl_secret = process.env.EXPO_PUBLIC_SPOTIFY_CL_SECRET;
  const [entries, setEntries] = useState([]);
  const [token, setToken] = useState();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${cl_secret}`
    })
      .then(response => response.json())
      .then(data => setToken(data.access_token))
  }, []);

  useEffect(() => {
    onValue(ref(database, '/participants'), (snapshot) => {
      setEntries(Object.entries(snapshot.val()))
    })
  }, []);

  const getPlaylist = () => {
    console.log("getPlaylist", token)
    fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DWVCKO3xAlT1Q", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const entriesWithPreview = entries.map((obj, index) => {
          let preview = data.tracks.items.map((item, index) => {
            if (item.track.name === obj[1].song) {
              return item.track.preview_url
            }
          }
          ).filter(item => item != undefined).pop()
          return { ...obj, preview }
        })
        setPlaylist(entriesWithPreview)
      })
  }

  return (
    <View style={styles.container}>
      <Button onPress={getPlaylist} >fetch</Button>
      <FlatList
        style={{ width: '100%' }}
        data={playlist ? playlist : entries}
        keyExtractor={(item) => item[0].toString()}
        renderItem={({ item }) =>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle>{item[1].country}</ListItem.Subtitle>
              <ListItem.Title>{item[1].artist}</ListItem.Title>
              <ListItem.Subtitle>{item[1].song}</ListItem.Subtitle>
              <ListItem.Subtitle>{item.preview}</ListItem.Subtitle>
              <Button title="Score" onPress={() => navigation.navigate('Score', { item })} />
            </ListItem.Content>
          </ListItem>
        }
      />
      <StatusBar style="auto" />
    </View>
  )
};