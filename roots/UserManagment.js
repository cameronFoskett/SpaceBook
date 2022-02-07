import React from 'react';

export default function UserManagment(){

async function LOGIN(email, password){

    const response = await fetch("http://localhost:3333/api/1.0.0/login",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        return response;
    }   

}