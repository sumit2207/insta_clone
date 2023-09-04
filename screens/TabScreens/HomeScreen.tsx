import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, View,Image ,Dimensions, FlatList} from 'react-native';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import {getUser} from '../../actions/user'
import {getPosts,likePost,unLikePost,savePost,unsavePost} from '../../actions/post'
import PostComponent from '../Components/PostComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';


const screenWidth=Dimensions.get('window').width
const screenHeight=Dimensions.get('window').height

 class HomeScreen extends React.Component {
  
  componentDidMount = () =>{
    this.props.getPosts(10)
  }
  
  render(){
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
             <View style={{height:50,width:screenWidth,borderBottomColor:'rgba(0,0,0,0.1)',borderBottomWidth:0.5,justifyContent:'space-between',flexDirection:"row"}}>
                <Image source={require('../../assets/images/logo.png')} style={{width:100,height:30, margin:10}}/>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <TouchableOpacity
                     onPress={()=>this.props.navigation.navigate('SavedPosts')}>
                          <Image source={require('../../assets/images/heart_725091.png')} style={{width:30,height:30,margin:10}}/>
                     </TouchableOpacity>
                     
                      <Image source={require('../../assets/images/instagram-share-13423.png')} style={{width:30,height:30,margin:10}}/>
                </View>
             </View>
            <FlatList
            
            data={this.props.post.feed}
            keyExtractor={(item) => JSON.stringify(item.id)}//to not throw warning of same id for children ,changed item.uid to .id as we're working with post uploaded having uid ame for 1 user 
            renderItem={({item})=>(
              <PostComponent
                item={item}
                user={this.props.user}
                likePost={(item)=>this.props.likePost(item)}
                unLikePost={(item)=>this.props.unLikePost(item)}
                savePost={(item)=>this.props.savePost(item)}
                unsavePost={(item)=>this.props.unsavePost(item)}
              />
            )}
            />

        </SafeAreaView>
  );
}
}




const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({getUser,getPosts,likePost,unLikePost,savePost,unsavePost},dispatch)
}
const mapStateToProps=(state)=>{
  return{
    user:state.user,
    post:state.post,
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)