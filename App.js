// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import 'react-native-gesture-handler';

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NewMatch from './pages/NewMatch';

import selectopening from './pages/selectopening';
import scoreboard from './pages/scoreboard';
import choosebowler from './pages/choosebowler';
import fallofwicket from './pages/fallofwicket';
import winpage from './pages/winpage';
import teams from './pages/teams';
import login from './pages/login';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login"
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen
          name="login"
          component={login}
         
        />
       <Stack.Screen
          name="NewMatch"
          component={NewMatch}
         
        />


      <Stack.Screen
          name="selectopening"
          component={selectopening}
         
        />

      <Stack.Screen
          name="scoreboard"
          component={scoreboard}
         
        />
        <Stack.Screen
          name="choosebowler"
          component={choosebowler}
         
        />
         <Stack.Screen
          name="fallofwicket"
          component={fallofwicket}
         
        />

    <Stack.Screen
          name="winpage"
          component={winpage}
         
        />
        <Stack.Screen
        name="teams"
        component={teams}/>

       
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
