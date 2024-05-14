import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import Register from '../screens/Register';
import Participants from '../screens/Participants';
import Logout from '../components/Logout';
import Login from '../screens/Login';
import JuryView from '../screens/JuryView';
import Scoreboard from '../screens/Scoreboard';
import Game from '../screens/Game';
import ShareGame from '../screens/ShareGame';
import { MyTheme } from '../styles';
import QRScanner from '../components/QRScanner';
import { auth } from './firebaseConfig';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name === 'Performances') {
      iconName = 'list';
    } else if (route.name === 'Scoreboard') {
      iconName = 'stats-chart';
    } else if (route.name === 'Login') {
      iconName = 'enter-outline';
    } else if (route.name === 'Register') {
      iconName = 'create-outline';
    } else if (route.name === 'Logout') {
      iconName = 'exit-outline';
    } else if (route.name === 'Game' || route.name === 'Share') {
      iconName = 'earth';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  }
});

function Authentication() {
  return (
    <Tab.Navigator screenOptions={screenOptions} >
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  )
}

function ChooseGame() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="QR Scanner" component={QRScanner} />
      <Stack.Screen
        name="GameMode"
        component={GameMode}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function GameMode() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Share" component={ShareGame} />
      <Tab.Screen
        name="Performances"
        component={Performances}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Scoreboard" component={Scoreboard} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  )
}

function Performances() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Participants" component={Participants} />
      <Stack.Screen name="Score" component={JuryView} />
    </Stack.Navigator>
  )
}

export default function Router() {
  const user = auth.currentUser;

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator >
        {user ?
          <Stack.Screen
            name="Play"
            component={ChooseGame}
              options={{ headerShown: false }}
          />
          :
          <Stack.Screen
            name="Auth"
            component={Authentication}
            options={{ headerShown: false }}
          />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}