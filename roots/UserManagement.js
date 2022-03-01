import * as CustomAsyncStorage from './CustomAsyncStorage.js'

export const CREATE = async (firstname, surname, email, password) => {
    const response = await fetch("http://localhost:3333/api/1.0.0/user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            first_name: firstname,
            last_name: surname,
            email: email,
            password: password
        })
    });
    return response;    
}

export const LOGIN = async (email, password) => {
    const response = await fetch("http://localhost:3333/api/1.0.0/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    return response;    
}

export const LOGOUT = async () => {
    const data = await CustomAsyncStorage.getData();
    const response = await fetch(`http://localhost:3333/api/1.0.0/logout`,
          {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
          })
    return response;    
}

export const GET_USER_DATA = async (id) => {
    const data = await CustomAsyncStorage.getData();
    const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}`,
          {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
          })

    return response;    
}

export const UPDATE_USER_DATA = async (userInfo) =>{
    const data = await CustomAsyncStorage.getData();
    const response = await fetch(`http://localhost:3333/api/1.0.0/user/${data.id}`,
              {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
                body: JSON.stringify({
                  first_name: userInfo.firstname,
                  last_name: userInfo.lastname,
                  email: userInfo.email,
                  password: userInfo.password
                })
              });
        return response;
}

export const GET_USER_PFP = async (id) => {
    const data = await CustomAsyncStorage.getData();
    let photo;
    await fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo?`+Date.now(),
        {
            method: 'GET',
            headers: { 'Content-Type': 'image/jpeg', 'X-Authorization':data.token},
        }).then((res) => {
            return res.blob();
        }).then((resBlob) => {
            photo = URL.createObjectURL(resBlob);
        });
    return photo;
}

export const UPDATE_USER_PFP = async (blob) => {
    const data = await CustomAsyncStorage.getData();

    return await fetch(`http://localhost:3333/api/1.0.0/user/${data.id}/photo`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'image/png', 'X-Authorization':data.token},
            body: blob,
        });
}




