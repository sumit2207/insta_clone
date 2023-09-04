import { v4 as uuid } from 'uuid';
import { doc, updateDoc,  setDoc ,arrayUnion ,query, orderBy, limit,collection ,getDocs, arrayRemove, where} from "firebase/firestore";
import { db } from '../config/Firebase';



export const updateDescription=(input)=>{
    return {type:'UPDATE_DESCRIPTION',payload:input}
}

export const updateNextPhoto=(input)=>{
    return async (dispatch,getState)=>{
        try{
            let  array= []
            const {post} =getState()
            console.log(post)
           
            post.photos?.forEach(photo =>{
                array.push(photo)
                console.log(array)
                });
            array.push(input)
            console.log(array)

            dispatch({type:'UPDATE_POST_NEXT_PHOTO',payload:array})
        }
        catch(error){
            alert(error)
        }
    }
}


export const removeImage=(photoToRemove)=>{
    return async (dispatch,getState)=>{
        try{
            let array=[]
            const {post}=getState()
            post.photos?.forEach(photo =>{
                array.push(photo)
            })
            array.splice(photoToRemove,1)
            dispatch({type:'UPDATE_POST_NEXT_PHOTO',payload:array})
        }
        catch(error){
            alert(error)
        }
    }
}
export const uploadPost = () =>{
    return async (dispatch,getState)=>{
        try{
            const{post,user} =getState()
            const id=uuid();
            console.log(id)
            console.log("hey")
            const upload={
                id:id,
                uid:user.uid,
                photo:user.photo,
                photos:post.photos,
                username:user.username,
                date:new Date().getTime(),
                savedBy:[],
                likes:[],
                comments:[],
                description:post.description,
            }
            console.log(upload)
            const docRef=doc(db,"posts",id)
            await setDoc(docRef,upload)
            console.log("success doc ref")

            const updateRef=doc(db,"users",user.uid)
            await updateDoc(updateRef,{
                posts:arrayUnion(id)
            })


        }
        catch(e){
        alert(e)
        console.log(e)
        }
    }
}
export const getPosts=(numberOfPost) =>{
    return async(dispatch,getState) => {
        const q = query(collection(db,"posts"), orderBy("date","desc"), limit(numberOfPost))
        const posts=await getDocs(q)
        let array=[]
        posts.forEach(function(response){
            array.push(response.data())
        });

        dispatch({type:"GET_POSTS",payload:array})
    }

}

export const likePost = (post)=>{
    return async(dispatch,getState)=>{
        try{
                const{uid}=getState().user
                const updateLike=doc(db,'posts',post.id)
                await updateDoc(updateLike,{
                    likes:arrayUnion(uid)
                })
        }catch(e){
            alert(e)
        }
    }
}
export const unLikePost = (post)=>{
    return async(dispatch,getState)=>{
        try{
                const{uid}=getState().user
                const updateLike=doc(db,'posts',post.id)
                await updateDoc(updateLike,{
                    likes:arrayRemove(uid)
                })
        }catch(e){
            alert(e)
        }
    }
}

export const savePost=(post)=>{
    return async(dispatch,getState)=>{
        try{
            const{uid}=getState().user
            const savedPost=doc(db,'posts',post.id)
            await updateDoc(savedPost,{
                savedBy:arrayUnion(uid)
            })

            const userSaved=doc(db,'users',uid)
            await updateDoc(userSaved,{
                savedPosts:arrayUnion(post.id)
            })
        }
        catch(e){
            alert(e)
        }
    }
}

export const unsavePost=(post)=>{
    return async(dispatch,getState)=>{
        try{
            const{uid}=getState().user
            const savedPost=doc(db,'posts',post.id)
            await updateDoc(savedPost,{
                savedBy:arrayRemove(uid)
            })

            const userSaved=doc(db,'users',uid) //So we can access the saved posts by our current user easily
            await updateDoc(userSaved,{
                savedPosts:arrayRemove(post.id)
            })
        }
        catch(e){
            alert(e)
        }
    }
}

export const getSavedPosts=(numberOfPost) =>{
    return async(dispatch,getState) => {
        const{uid}=getState().user
        const q = query(collection(db,"posts"), orderBy("date","desc"),where('savedBy','array-contains',uid))
        const posts=await getDocs(q)
        let array=[]
        posts.forEach(function(response){
            array.push(response.data())
        });

        dispatch({type:"GET_SAVED_POSTS",payload:array})
    }

}