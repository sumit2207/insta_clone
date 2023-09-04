import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator'
import PostCheckout from '../screens/TabScreens/Upload/PostCheckout'
import SavedPosts from '../screens/TabScreens/HeaderScreens/SavedPosts'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {TouchableOpacity,Text}from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import {uploadPost} from '../actions/post'
const Stack = createStackNavigator();

class  MyStack extends React.Component {
  render(): React.ReactNode {
    return (
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown:false}} />
        <Stack.Screen name="SavedPosts" component={SavedPosts}  />
        <Stack.Screen name="PostCheckout" component={PostCheckout} options={{
          headerShown:true,headerTitle:'see your post',
          headerRight: () => (
          <TouchableOpacity style={{margin:10,flexDirection:'row',}}
          onPress={()=>this.props.uploadPost()}>
            <Text style={{color:'blue',fontWeight:'bold',fontSize:22,marginHorizontal:5,bottom:0}}>POST</Text>
               <FontAwesome name='check' color={'blue'} size={23} style={{top:2}}/>

            </TouchableOpacity>
          ),
  
      }} />
       
      </Stack.Navigator>
    );  
  }
  
}


const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({uploadPost},dispatch)
}
const mapStateToProps=(state)=>{
  return{
    user:state.user,
    post:state.post
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyStack)