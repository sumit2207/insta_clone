import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image,View ,TouchableOpacity,TextInput,Dimensions} from 'react-native';
import React from 'react';
import { bindActionCreators } from 'redux';
import { updateEmail,updatePassword,updateUsername,signup} from '../../actions/user';
import { connect } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker'
import {updatePhoto} from '../../actions/user'
import {uploadPhoto} from '../../actions/index'
const screenHeight=Dimensions.get('window').height;
const screenWidth=Dimensions.get('window').width;
 class ProfilePicture extends React.Component {
  openLibrary= async ()=>{
    const {status}= await MediaLibrary.requestPermissionsAsync()
    if(status  === 'granted'){
      const  image=await ImagePicker.launchImageLibraryAsync({
        
        allowsEditing:true,

      })
      if(!image.canceled){
       
        const url = await this.props.uploadPhoto(image)
        console.log(url)
        this.props.updatePhoto(url)
       
      }
  }
}
  render(){
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Image source={require('../../assets/backgrounds/imaginative-drawings.jpg')} style={{position:'absolute',zIndex:-1,width:screenWidth,height:screenHeight+50}}/>
        <View style={{justifyContent:'center',alignItems:'center',bottom:100}}>
            <Text style={{fontWeight:'bold',fontSize:24,color:'black',margin:15}}>Choose a profile picture</Text>
            {
                (this.props.user.photo == undefined)?
                <TouchableOpacity
                onPress={()=>this.openLibrary()}>
                         <View style={{width:screenWidth*.5,height:screenWidth*.5,borderRadius:screenWidth*.25,backgroundColor:'beige'}}/>
                </TouchableOpacity>
               
                :
                <TouchableOpacity
                onPress={()=>this.openLibrary()}>
                    <Image source={{uri:this.props.user.photo}}
                       style={{width:screenWidth*.5,height:screenWidth*.5,borderRadius:screenWidth*.25,backgroundColor:'beige'}}/>
                </TouchableOpacity>
             }
             <TouchableOpacity style={{margin:25,padding:20,borderRadius:14,backgroundColor:'rgba(0,0,0,0.05)',width:screenWidth*.9,alignItems:'center'}}
             onPress={()=>this.props.navigation.navigate('Signup')}>
                <Text style={{fontWeight:'bold',fontSize:24,color:'black'}}>Continue</Text>
             </TouchableOpacity>
        </View>
      </View>
  );
}
}


const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({updatePhoto,uploadPhoto},dispatch)
}
const mapStateToProps=(state)=>{
  return{
    user:state.user,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfilePicture)