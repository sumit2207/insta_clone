import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/AuthScreens/Login';
import Signup from '../screens/AuthScreens/Signup';
import { useFonts } from '@use-expo/font';
import Welcome from '../screens/AuthScreens/Welcome';
import StackNavigator from './StackNavigator';
import ProfilePicture from '../screens/AuthScreens/ProfilePicture';

const Stack= createNativeStackNavigator();

export default function App(){
    const [ fontsLoaded]=useFonts({
        'Logo-font':require('../assets/fonts/Handlee-Regular.ttf')
    });
    if(!fontsLoaded){
        return <View/>
    }
    else{
    return(
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false,title:'Welcome'}}/>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false,title:'Login'}}/>
                <Stack.Screen name='Signup' component={Signup} options={{
                    headerStyle: {
                        backgroundColor: '#f5f5dc',
                      },
                }}/>
                 <Stack.Screen name='ProfilePicture' component={ProfilePicture} options={{
                    headerStyle: {
                        backgroundColor: '#f5f5dc',
                      },
                }}/>
                <Stack.Screen name='StackNavigator' component={StackNavigator}  options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
    }
}