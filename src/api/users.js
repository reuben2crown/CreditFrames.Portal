import client from "./client";
import jwtDecode from "jwt-decode";
import { create } from "apisauce";

const refreshToken = (data) => {
    const input = {
        "refreshToken": data.refreshToken,
        "userId": data.userId,
        "deviceId": data.deviceId
    }
    console.log(input);
    const user = JSON.parse(localStorage.getItem("userData"));
    const client1 = create({
        baseURL: 'https://apitest.creditframes.com',
        headers: {
            Accept: 'application/json',
            "Authorization": `Bearer ${user.accessToken}`,
        },
    });
    return client1.post("/api/Auth/RefreshToken", input);
}

const login = (data) => {

    const input = {
        "emailAddress": data.email,
        "password": data.password,
        "loginChannel": "Web",
        "deviceId": data.deviceId,
    };

    return client.post("/api/Auth/Login", input);
};

const contact =(data) => {
    return client.post("/api/Email/ContactForm", data);
}

const register = (data) => {

    const input = {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "emailAddress": data.email,
        "phoneNumber": data.phone,
        "password": data.password,
        "confirmPassword": data.password1,
        "signupChannel": "Web",
        "deviceId": data.deviceId,
    }

    console.log(input);
    return client.post("/api/Auth/Register", input);
};

const searchLoan = (data) => {

    console.log(data);

    return client.get("/api/Lenders/Compare", data);
    // {
    //     "LoanAmount": "20000000",
    //         "LoanTypeId": "2",
    //             "UserId": 5,
    //                 "DeviceId": "e8f5f1cb5ce51b7e630daed86e74ac01",
    //                     "CountryId": 241
    // }
    //return client.get("/api/Lenders/Compare?LoanTypeId=1&LoanAmount=200000&UserId=5&PageNumber=1&PageSize=2");
}
// https://apitest.creditframes.com/api/Lenders/Compare?LoanTypeId=1&Amount=20000&UserId=3&PageNumber=1&PageSize=2

const passRecovery = (data) => {
    ///////////////////////////////////
    console.log(data);
    ///////////////////////////////////
    return client.post("/api/PasswordManagers/InitiatePasswordReset", data);
}

const tokenValidation = (data) => {
    ///////////////////////////////////
    console.log(data);
    ///////////////////////////////////
    return client.post("/api/PasswordManagers/ValidateResetPasswordCode", data);
}

const changePassword = (data) => {
    ///////////////////////////////////
    console.log(data);
    ///////////////////////////////////
    return client.post("/api/PasswordManagers/CompletePasswordReset", data);
}

const getDashboardData = (data) => {
    return client.get(`/api/Dashboard/UserDashboard/${data.userId}`);
}

const getCountries = () => {
    return client.get("/api/Countries?fetchAll=true");
}

const getState = () => {
    return client.get("/api/States");
}

const userLogout = (data) => {
    //console.log(data);
    return client.post("/api/Auth/Logout", data);
}

const getLoanData = (data) => {
    console.log(data);
    return client.get("/api/Loans", data);
}

const getLoanTypes = () => {
    return client.get("/api/LoanTypes");
}

const loanApplication = (data) => {
    console.log(data);
    //return client.post("/api/Loans", data);
}


const userApis = { 
    login,
    register,
    searchLoan,
    passRecovery,
    tokenValidation,
    changePassword,
    contact,
    getDashboardData,
    getCountries,
    userLogout,
    getLoanData,
    getState,
    refreshToken,
    getLoanTypes,
    loanApplication,
};
export default userApis;