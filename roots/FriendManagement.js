import * as CustomAsyncStorage from './CustomAsyncStorage.js'

export const GET_FRIEND_DATA = async (id) => {
    const data = await CustomAsyncStorage.getData();
    const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/friends`,
          {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
          });
    return response;  
}


export const ADD_FRIEND = async (id) => {
    const data = await CustomAsyncStorage.getData();
    await fetch(`http://localhost:3333/api/1.0.0/user/${id}/friends`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
            });
}

export const SEARCH = async (criteria) => {
    const data = await CustomAsyncStorage.getData();
    const response = await fetch(`http://localhost:3333/api/1.0.0/search?q=${criteria}`,
          {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
          });
    return response;
}

export const FRIENDREQUESTS = async () => {
    const data = await CustomAsyncStorage.getData();
    return await fetch(`http://localhost:3333/api/1.0.0/friendrequests`,
          {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
          });
}


export const ACCEPT_REQUEST = async (id) => {
    const data = await CustomAsyncStorage.getData();
    return await fetch(`http://localhost:3333/api/1.0.0/friendrequests/${id}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
        });
}

export const REJECT_REQUEST = async (id) => {
    const data = await CustomAsyncStorage.getData();
    return await fetch(`http://localhost:3333/api/1.0.0/friendrequests/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
        });
}
