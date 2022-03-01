import * as CustomAsyncStorage from './CustomAsyncStorage.js'

export const GET_USER_POSTS = async (id) => {
    const data = await CustomAsyncStorage.getData();
    return await fetch(`http://localhost:3333/api/1.0.0/user/${id}/post`,
                {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
               });
    
}

export const CREATE_POST = async (post, id) => {
    const data = await CustomAsyncStorage.getData();
    return await fetch(`http://localhost:3333/api/1.0.0/user/${id}/post`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
                  body: JSON.stringify({
                      text: post
                    })
               });

}

export const GET_POST_DATA = async (userID, postID) => {
  const data = await CustomAsyncStorage.getData();
  return await fetch(`http://localhost:3333/api/1.0.0/user/${userID}/post/${postID}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
        });
}

export const UPDATE_POST = async (userID, postID, post) => {
  const data = await CustomAsyncStorage.getData();
  await fetch(`http://localhost:3333/api/1.0.0/user/${userID}/post/${postID}`,
                {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
                  body: JSON.stringify({
                      text: post
                    })
               });
}

export const DELETE_POST = async (userID, postID) => {
  const data = await CustomAsyncStorage.getData();
  await fetch(`http://localhost:3333/api/1.0.0/user/${userID}/post/${postID}`,
                {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
               });
}

export const LIKE = async (friendID, postID) => {
    const data = await CustomAsyncStorage.getData();
    return await fetch(`http://localhost:3333/api/1.0.0/user/${friendID}/post/${postID}/like`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
        });
}

export const DISLIKE = async (friendID, postID) => {
    const data = await CustomAsyncStorage.getData();
    return await fetch(`http://localhost:3333/api/1.0.0/user/${friendID}/post/${postID}/like`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
        });
}




