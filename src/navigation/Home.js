import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/Home/Search';
import WhishList from '../screens/Home/WhishList';
import Event from '../screens/Home/Event';
import Profile from '../screens/Home/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
const bottomTab = createBottomTabNavigator();

const Home = () => {
  return (
    <bottomTab.Navigator
    initialRouteName='Event'
      screenOptions={({ route }) => ({
        headerShown: false,
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Event') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black', 
        tabBarInactiveTintColor: 'gray', 
      })}
    >
      <bottomTab.Screen name="Search" component={Search} />
      <bottomTab.Screen name="Event" component={Event} />
      <bottomTab.Screen name="Favourite" component={WhishList} />
      <bottomTab.Screen name="Profile" component={Profile} />
    </bottomTab.Navigator>
  );
};

export default Home;
