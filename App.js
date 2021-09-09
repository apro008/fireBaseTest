import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screen/Home';
import AddItem from './src/screen/AddItem';
import List from './src/screen/List';
import Register from './src/screen/Register';
import Signin from './src/screen/Signin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NativeModules} from 'react-native';

const {RNTwitterSignIn} = NativeModules;

const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '314951330325-nuvvcbtvs6g7ruvk66bf2brsuoof3mh1.apps.googleusercontent.com',
    });
    RNTwitterSignIn.init(
      'HP2hOXtt93xVBK4s2P8y93EEx',
      'pA67q7KnwOQkxSDUfPK5Nm7xhbZBH44EnD3UzusjZFfPKLmS5K',
    ).then(() => console.log('Twitter SDK initialized'));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerMode: 'none',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Signin" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
