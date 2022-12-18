import React from "react";
import { create } from "apisauce";

const user = JSON.parse(localStorage.getItem("userData"));

const token = user?.accessToken;
//https://apitest.creditframes.com/

// define the api
const client = create({
    baseURL: 'https://api.creditframes.com',
    headers: {
        Accept: 'application/json',
        "Authorization": `Bearer ${token}`,
    },
});

export default client;