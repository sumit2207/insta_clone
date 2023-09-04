import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, View ,Image, Dimensions,TouchableOpacity} from 'react-native';
import { bindActionCreators } from 'redux';
import { auth } from '../../config/Firebase';
import { connect } from 'react-redux';
import {  signOut } from "firebase/auth";
import {getUser} from '../../actions/user'


const screenWidth=Dimensions.get('window').width
const screenHeight=Dimensions.get('window').height

 class ProfileScreen extends React.Component {
  
  
  render(){
    return (
        <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../../assets/backgrounds/imaginative-drawings.jpg')} style={{position:'absolute',zIndex:-1,width:screenWidth,height:screenHeight+50}}/>
            
            <TouchableOpacity
            onPress={()=> signOut(auth)}>
            <Text style={{fontSize:35,fontFamily:'Logo-font',marginVertical:40}}>ProfileScreen</Text>
            </TouchableOpacity>

        </View>
  );
    }
}


const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({getUser},dispatch)
}
const mapStateToProps=(state)=>{
  return{
    user:state.user,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen)