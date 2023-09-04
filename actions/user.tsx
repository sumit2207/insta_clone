import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import {db,auth} from '../config/Firebase';
import firebase from 'firebase/app';

import { collection, addDoc,setDoc ,doc } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore';
import {  getDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import {orderBy} from 'lodash'

export const updateEmail=(input)=>{
    return {type:'UPDATE_EMAIL',payload:input}
}
export const updatePassword=(input)=>{
    return {type:'UPDATE_PASSWORD',payload:input}
}
export const updateUsername=(input)=>{
    return {type:'UPDATE_USERNAME',payload:input}
}
export const updatePhoto=(input)=>{
    return {type:'UPDATE_PHOTO',payload:input}
}

export const signup=()=>{
    return async(dispatch,getState)=>{
        
        try{
        const{username,email,password,photo}=getState().user 
     
        
        const userCredential =await createUserWithEmailAndPassword(auth,email,password)
        if(userCredential.user.uid){
            console.log("s")
            const user = {
                uid: userCredential.user.uid,
                username:username,
                email: email,
                posts:[],
                bio: '',
                likes:0,
                photo: photo,
                savedPosts:[],
            }
            const docRef=doc(db,"users",userCredential.user.uid)
            await setDoc(docRef,user)
              console.log("Document written with ID: ", docRef.id);
            
               dispatch({type: 'LOGIN', payload: user})
				alert('User has been signed up!')
        
      }
    }
      catch(e){
        console.log(e)
        alert(e)
      }
}
}

export const login=()=>{
    return async(dispatch,getState)=>{
    try{
        const{email,password}=getState().user
        const response= await signInWithEmailAndPassword(auth,email,password)

        dispatch(getUser(response.user.uid))
    }
    catch(e){
        console.log(e)
        alert(e)
    }
}
}
export const getUser=(uid)=>{
    return async(dispatch,getState)=>{
   try{
    const userQuery=await getDoc(doc(db,'users',uid))
    let user=  userQuery.data()
    let posts=[]
    const postQuery=await getDocs(query(collection(db, "posts"), where("uid", "==", uid)));
    postQuery.forEach(function(response){
       posts.push(response.data())
    })
    user.posts=orderBy(posts,'data','desc')
    dispatch({type:'LOGIN',payload:user})
   }
   catch(e){
    alert(e)
   }
    }
}



