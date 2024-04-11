import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth } from 'firebase/auth';
import Register from '../components/Register';
import Participants from '../components/Participants';
import Logout from '../components/Logout';
import Login from '../components/Login';
import JuryView from '../components/JuryView';
import Scoreboard from '../components/Scoreboard';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Performances') {
      iconName = 'list';
    } else if (route.name === 'Scoreboard') {
      iconName = 'podium';
    } else if (route.name === 'Login') {
      iconName = 'enter-outline';
    } else if (route.name === 'Register') {
      iconName = 'create-outline';
    } else if (route.name === 'Logout') {
      iconName = 'exit-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  }
});

function StackNavi() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Participants" component={Participants} />
      <Stack.Screen name="Score" component={JuryView} />
    </Stack.Navigator>
  )
}

export default function Router({ user }) {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions} >
        {user ?
          <>
            <Tab.Screen
              name="Performances"
              component={StackNavi}
              options={{ headerShown: false }}
            />
            <Tab.Screen name="Scoreboard" component={Scoreboard} />
            <Tab.Screen name="Logout" component={Logout} />
          </>
          :
          <>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Register" component={Register} />
          </>
        }

      </Tab.Navigator>
    </NavigationContainer>
  );
}