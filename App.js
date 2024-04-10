import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import Participants from './components/Participants';
import Scoreboard from './components/Scoreboard';
import JuryView from './components/JuryView';

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Participants') {
      iconName = 'home';
    } else if (route.name === 'Scoreboard') {
      iconName = 'settings';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  }
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNavi() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Participants" component={Participants} />
      <Stack.Screen name="Score" component={JuryView} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Performances"
          component={StackNavi}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Scoreboard" component={Scoreboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

