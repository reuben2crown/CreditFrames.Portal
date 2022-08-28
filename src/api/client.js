import React from "react";
import { create } from "apisauce";


// define the api
const client = create({
    baseURL: 'https://apitest.creditframes.com',
    headers: {
        Accept: 'application/json',
    },
});

export default client;