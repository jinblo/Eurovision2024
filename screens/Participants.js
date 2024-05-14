import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { database } from "../services/firebaseConfig";
import { ref, onValue } from 'firebase/database';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from '@rneui/base';
import { Audio } from 'expo-av';
import { Avatar, Button } from '@rneui/themed';
import { styles } from '../styles';
import PlayPreview from '../components/PlayPreview';
import { useTheme } from '@react-navigation/native';


export default function Participants({ route, navigation }) {
  const client_id = process.env.EXPO_PUBLIC_SPOTIFY_CL_ID;
  const cl_secret = process.env.EXPO_PUBLIC_SPOTIFY_CL_SECRET;
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([]);
  const [token, setToken] = useState();
  const [playlist, setPlaylist] = useState([]);
  const { colors } = useTheme();

  const getToken = () => {
    setLoading(true)
    fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${cl_secret}`
    })
      .then(response => response.json())
      .then(data => setToken(data.access_token))
  }

  const getPlaylist = () => {
    setLoading(true)
    fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DWVCKO3xAlT1Q/tracks", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const entriesWithPreview = entries.map((obj, index) => {
          let track = { preview: '', image: '' }
          data.items.map((item, index) => {
            if (item.track.name === obj[1].song) {
              track.preview = item.track.preview_url
              track.image = item.track.album.images[0].url
            }
          }
          ).filter(item => item != undefined).pop()
          return { ...obj, track }
        })
        setPlaylist(entriesWithPreview)
        setLoading(false)
      })
  }

  async function playSound(url) {
    const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
    await sound.playAsync();
  }

  useEffect(() => {
    onValue(ref(database, '/participants'), (snapshot) => {
      setEntries(Object.entries(snapshot.val()))
    })
  }, []);

  useEffect(getToken, []);

  useEffect(getPlaylist, [token]);

  return (
    <View style={styles.container}>
      {loading ?
        <ActivityIndicator size='large' />
        :
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
                {item.track.preview ?
                  <PlayPreview url={item.track.preview} />
                  : null}
                <Button title="Score" color={colors.primary} onPress={() => navigation.navigate('Score', { item })} />
              </ListItem.Content>
              {item.track.image ? <Avatar source={{ uri: item.track.image }} size='xlarge' /> : null}
            </ListItem>
          }
        />
      }
      <StatusBar style="auto" />
    </View>
  )
};
