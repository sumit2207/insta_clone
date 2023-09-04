
import * as ImageManipulator from 'expo-image-manipulator';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import { getStorage, ref, uploadBytes,getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { random } from 'lodash';



export const uploadPhoto=(image:any)=>{
 return async(dispatch:any)=>{
    var metadata={
        cacheControl:'public,max-age=5000,s-maxage=600',
    }
    let  fileType=image.uri.split("/")
    let length=fileType.length-1
    fileType=fileType[length].split(".")[1]
    const resize= await ImageManipulator.manipulateAsync(image.uri,[],{
        format:ImageManipulator.SaveFormat[fileType==="jpeg"||"jpg" ? "JPEG" : "PNG"],
        compress:0.5,
        base64:false,
    })

    const response=await fetch(resize.uri)
    const blob= await response.blob()
        console.log('success')

    const storage = getStorage()
  

    const id: string = uuid();

console.log(id);
 
    const storageRef = ref(storage, `images/${id}`)

    const uploadTask=await uploadBytes(storageRef, blob, metadata)
    console.log('success')

    const downloadURL= getDownloadURL(storageRef)
    return downloadURL

 }
}