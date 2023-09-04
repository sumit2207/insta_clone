import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SwitchNavigator from './navigation/LoginNavigator'
import  ThunkMiddleware  from 'redux-thunk';
import reducer from './reducers/index';
import { Provider } from 'react-redux';
import {legacy_createStore as createStore,applyMiddleware} from 'redux';
// RN >= 0.63
import { LogBox } from 'react-native';

LogBox.ignoreLogs([' Warning: Encountered two children with the same key, `"eQ7XkcU79YNMsbjKCZFVHX9EDlj2"`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.']);




const middleware=applyMiddleware(ThunkMiddleware)
const store=createStore(reducer,middleware)
export default class  App extends React.Component {
  render(){
  return (
    <Provider store={store}> 
     <SwitchNavigator/>
     </Provider> 
  );
}
}


