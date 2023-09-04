import {combineReducers} from 'redux';
import thunk from "redux-thunk"
import {createStore,applyMiddleware} from "redux"

const user = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'UPDATE_EMAIL':
            return { ...state, email:action.payload}
        case 'UPDATE_PASSWORD':
            return { ...state, password:action.payload}
        case 'UPDATE_USERNAME':
            return { ...state, username:action.payload.toUpperCase().replace(' ', '_')}
        case 'UPDATE_PHOTO':
            return { ...state, photo: action.payload}
        default:
            return state
    }
}

const post=(state={},action)=>{
    switch(action.type){
        case 'UPDATE_POST_NEXT_PHOTO':
            return {...state,photos:action.payload}
        case 'UPDATE_DESCRIPTION':
            return {...state,description:action.payload}
         case 'UPDATE_PHOTO':
                return {...state,photo:action.payload}    
        case 'GET_POSTS':
            return {...state,feed: action.payload}
        case 'GET_SAVED_POSTS':
            return {...state,saved_feed:action.payload}    
                
        default:
            return state    
    }
}

const rootReducer=combineReducers({
    user,
    post
})



export default rootReducer