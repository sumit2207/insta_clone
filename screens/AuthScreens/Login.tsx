import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Image,TextInput,Dimensions} from 'react-native';
import { bindActionCreators } from 'redux';
import { updateEmail,updatePassword,login} from '../../actions/user';
import { connect } from 'react-redux';

const screenHeight=Dimensions.get('window').height;
const screenWidth=Dimensions.get('window').width;


 class Login extends React.Component {
  render(){
    return (
    <View style={{flex: 1  , backgroundColor: 'white',  alignItems: 'center'}}>
       <Image source={require('../../assets/backgrounds/imaginative-drawings.jpg')} style={{position:'absolute',zIndex:-1,width:screenWidth,height:screenHeight+50}}/>
     <Text style={{fontSize:30,fontFamily:'Logo-font',marginVertical:40}}>Clonegram</Text>
     <View style={{marginTop:100}}>
      <View style={{width:screenWidth*0.9,marginTop:10}}>
        <Text style={{left:15}}>Email</Text>
      </View>
      <TextInput
      style={{height:50,width:screenWidth*0.9,color:'black',paddingHorizontal:20,margin:0,borderRadius:10,borderColor:'grey',borderWidth:1}}
      placeholderTextColor={'grey'}
      placeholder={'xyz@xyz.com'}
      onChangeText={input=>this.props.updateEmail(input)}
      value={this.props.user.email}
      />
      <View style={{width:screenWidth*0.9,marginTop:10}}>
        <Text style={{left:15}}>Password</Text>
      </View>
      <TextInput
      style={{height:50,width:screenWidth*0.9,color:'black',paddingHorizontal:20,margin:0,borderRadius:10,borderColor:'grey',borderWidth:1}}
      placeholderTextColor={'grey'}
      placeholder={'Password123'}
      onChangeText={input=>this.props.updatePassword(input)}
      value={this.props.user.password}
      />
       

      </View>
     <View style={{width:screenWidth,justifyContent:'center',alignItems:'center',margin:30}}>
     <TouchableOpacity style={{width:screenWidth*0.6,height:50,borderRadius:30,backgroundColor:'#0095f6',justifyContent:'center',alignItems:'center'}}
     onPress={()=>this.props.login()}>
        <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Login</Text>
        </TouchableOpacity>
       <TouchableOpacity style={{alignItems:'center',flexDirection:'row',margin:10}}
       onPress={()=>this.props.navigation.navigate('ProfilePicture')}>
        <Text style={{fontSize:18}}>Don't have an account?</Text>
        <Text style={{fontSize:18,color:'#0095f6',fontWeight:'bold'}}>Signup</Text>
        </TouchableOpacity> 
     </View>

     <View style={{position:'absolute',top:700,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:18}}>from</Text>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Sumit</Text>
     </View>

     

    </View>
  );
    }
}


const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({updateEmail,updatePassword,login},dispatch)
}
const mapStateToProps=(state)=>{
  return{
    user:state.user,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)