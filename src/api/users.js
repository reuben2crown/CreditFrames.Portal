import client from "./client";

const login = (data) => {

    console.log(data);
    const input = {
        "emailAddress": data.email,
        "password": data.password,
        "loginChannel": "Website",
        "deviceId": "none",
    };
    console.log(input);
    // const endpoint = data.userType === "admin" ? "/api/admin/Administrator/Login" : data.userType === "cadmin" ? "/api/CompanyProfile/Login" : "/api/AssessorProfile/Login";

    return client.post("/api/Auth/Login", input);
};

const register = (data) => {

    const input = {
        "firstName": data.firstname,
        "lastName": data.lastName,
        "emailAddress": data.email,
        "phoneNumber": data.phone,
        "password": data.password,
        "confirmPassword": data.password1,
        "signupChannel": "Website",
        "deviceId": "none",
    }

    return client.post("/api/Auth/Register", input);
};

const userApis = { 
    login,
    register,
};
export default userApis;