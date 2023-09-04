import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, View,Image ,Dimensions, FlatList} from 'react-native';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import {getUser} from '../../../actions/user'
import {getSavedPosts,likePost,unLikePost,savePost,unsavePost} from '../../../actions/post'
import PostComponent from '../../Components/PostComponent';
import { SafeAreaView } from 'react-native-safe-area-context';


const screenWidth=Dimensions.get('window').width
const screenHeight=Dimensions.get('window').height

 class SavedPosts extends React.Component {
  
  componentDidMount = () =>{
    this.props.getSavedPosts(10)
  }
  j
  render(){
    return (
       
            
            <FlatList
            
            data={this.props.post.saved_feed}
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

       
  );
}
}




const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({getUser,getSavedPosts,likePost,unLikePost,savePost,unsavePost},dispatch)
}
const mapStateToProps=(state)=>{
  return{
    user:state.user,
    post:state.post,
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SavedPosts)