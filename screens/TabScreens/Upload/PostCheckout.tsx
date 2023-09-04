import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, View,Image ,Dimensions,TextInput, ScrollView} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {updateDescription} from '../../../actions/post'

import {getUser} from '../../../actions/user'


const screenWidth=Dimensions.get('window').width
const screenHeight=Dimensions.get('window').height

 class PostCheckout extends React.Component {
  

  render(){
    return (
        <View style={{flex:1,backgroundColor:'white',alignItems:'center'}}>
             <Image source={require('../../../assets/backgrounds/imaginative-drawings.jpg')} style={{position:'absolute',zIndex:-1,width:screenWidth,height:screenHeight+50}}/>
             <TextInput
                style={{height:50,width:screenWidth*0.9,color:'black',paddingHorizontal:20,margin:0,borderRadius:10,borderColor:'grey',borderWidth:1}}
                placeholderTextColor={'black'}
                placeholder={'Type a description:'}
                onChangeText={input=>this.props.updateDescription(input)}
                value={this.props.post.description}
                style={{backgroundColor:'rgba(0,0,0,0.10)',fontSize:20,paddingVertical:10,paddingHorizontal:15,margin:20,width:'95%',borderRadius:10}}
                />
                <View>
                    <ScrollView
                    horizontal={true}
                    pagingEnabled={true}>
                        {
                            this.props.post.photos?.map(e=>
                               <Image  key={e} source={{uri:e}} style={{width:screenWidth,height:360}} /> 
                                )
                        }


                    </ScrollView>
                </View>
        </View>
  );
    }
}


const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({updateDescription},dispatch)
}
const mapStateToProps=(state)=>{
  return{
    user:state.user,
    post:state.post
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostCheckout)