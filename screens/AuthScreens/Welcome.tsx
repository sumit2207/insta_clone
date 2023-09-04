import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Image,TextInput,Dimensions} from 'react-native';
import { bindActionCreators } from 'redux';
import {auth} from '../../config/Firebase';
import { connect } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import {getUser} from '../../actions/user'




 class Welcome extends React.Component {
  componentDidMount=()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        this.props.getUser(user.uid)

        if(this.props.user!=null){
          this.props.navigation.navigate('StackNavigator')
          this.props.navigation.reset({
            index:0,
            routes:[{name:'StackNavigator'}]
          })
  
        }
        // ...
      } else {
        // User is signed out
        // ...
        this.props.navigation.navigate('Login')
      }
    })
  }

  render(){
    return (
        <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:30,fontFamily:'Logo-font',marginVertical:40}}>Clonegram</Text>

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

export default connect(mapStateToProps,mapDispatchToProps)(Welcome)