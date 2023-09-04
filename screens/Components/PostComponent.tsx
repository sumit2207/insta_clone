import React, { Component } from 'react'
import { View, Text ,Image,Dimensions,ScrollView, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
const screenWidth=Dimensions.get("window").width

export  default class PostComponent extends Component {
  static propTypes = {
    prop: PropTypes.string
  }
  state={
    liked:undefined,
    numlike:0,
    saved:undefined,
  }
  likePost=()=>{
    if(this.props.item.likes.includes(this.props.user.uid) || this.state.liked == true){
      if(this.state.liked== false){
        this.setState({liked:true})
        this.setState({numlike:this.state.numlike+1})
        this.props.likePost(this.props.item)
      }
      else{
        this.setState({liked:false})
        this.setState({numlike:this.state.numlike-1})
        this.props.unLikePost(this.props.item)
      }

    }
    else{
       this.setState({liked:true})
       this.setState({numlike:this.state.numlike+1})
       this.props.likePost(this.props.item)
    }
  }
  savePost=()=>{
    if(this.props.item.savedBy.includes(this.props.user.uid) || this.state.saved == true){
      if(this.state.saved== false){
        this.setState({liked:true})
        this.props.savePost(this.props.item)
      }
      else{
        this.setState({saved:false})
        this.props.unsavePost(this.props.item)
      }

    }
    else{
       this.setState({saved:true})
       this.props.savePost(this.props.item)
    }
  }
  render() {
    return (
        <View style={{marginBottom:10}}>
          <View style={{width:screenWidth,height:50,flexDirection:'row',backgroundColor:"white",justifyContent:'space-between',alignItems:'center',borderBottomColor:'grey',borderBottomWidth:0.07}}>
            <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
              <Image source={{uri:this.props.item.photo}} style={{width:40,height:40,borderRadius:20,margin:10}}/>
              <Text style={{fontWeight:'bold',fontSize:18}}>{this.props.item.username}</Text>
           </View>      
            <Text style={{margin:15}}>{moment(this.props.item.date).format('ll')}</Text>
          </View>
          <View>
                    <ScrollView
                    horizontal={true}
                    pagingEnabled={true}>
                        {
                            this.props.item.photos?.map(e=>
                               <Image  key={e} source={{uri:e}} style={{width:screenWidth,height:360}} /> 
                                )
                        }


                    </ScrollView>
                </View>
                <View style={{width:screenWidth,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                          <TouchableOpacity
                          onPress={()=>this.likePost()}>
                          {
                            (this.props.item.likes.includes(this.props.user.uid) && this.state.liked == undefined)?
                            <Image source={require('../../assets/images/heart_725091.png')} style={{width:30,height:30,margin:10}}/>
                            :
                                (this.state.liked == true)?
                                <Image source={require('../../assets/images/heart_725091.png')} style={{width:30,height:30,margin:10}}/>
                                :
                                <Image source={require('../../assets/images/heart_1077035.png')} style={{width:30,height:30,margin:10}}/>
                          }
                          
                          </TouchableOpacity>
                          <Image source={require('../../assets/images/instagram-comment-13416.png')} style={{width:30,height:30,margin:10}}/>
                          <Image source={require('../../assets/images/instagram-share-13423.png')} style={{width:30,height:30,margin:10}}/>
                          
                        </View>
                        <TouchableOpacity
                        onPress={()=>this.savePost()}>
                          {       
                              (this.props.item.savedBy.includes(this.props.user.uid) && this.state.saved == undefined)?
                              <Image source={require('../../assets/images/bookmark-ribbon-7789.png')} style={{width:30,height:30,margin:10}}/>
                               : 
                                 (this.state.saved==true)?
                                 <Image source={require('../../assets/images/bookmark-ribbon-7789.png')} style={{width:30,height:30,margin:10}}/>
                                 :
                                 <Image source={require('../../assets/images/save-black-18315.png')} style={{width:30,height:30,margin:10}}/>

                          }  
                        </TouchableOpacity>
                        
                        
                </View>
                <Text style={{fontWeight:'bold',marginHorizontal:10}}>{ this.props.item.likes.length + this.state.numlike } likes</Text>
                <View style={{flexDirection:'row',marginTop:5}}>
                  <Text style={{fontWeight:'bold',marginLeft:10}}>{this.props.item.username} </Text>
                  <Text>{this.props.item.description}</Text>
                </View>
                <TouchableOpacity>
                <Text style={{color:'grey',marginLeft:10,marginTop:5}}>View all {this.props.item.comments.length} comments</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                              <Image
                              source={{uri:this.props.user.photo}}
                              style={{width:32,height:32,borderRadius:32/2,marginHorizontal:10}}
                              />
                              <Text style={{color:'grey'}}>Add a comment...</Text>
                        </View>
                        <Image source={require('../../assets/images/emojis.jpg')} style={{width:80,height:17,margin:10}}/>
                </View>
                <Text style={{color:'grey',marginHorizontal:10,marginTop:5}}>{moment(this.props.item.date).format('ll')}</Text>
                
      </View>
    )
  }
}

