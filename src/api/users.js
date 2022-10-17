import client from "./client";
import jwtDecode from "jwt-decode";

const refreshToken = (data) => {
    const input = {
        "refreshToken": data.refreshToken,
        //"userId": data.userId,
        "deviceId": data.deviceId
    }
    return client.post("/api/Auth/RefreshToken", input);
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

    //console.log(input);
    return client.post("/api/Auth/Register", input);
};

const searchLoan = (data) => {

    window.localStorage.setItem("searchLoan", JSON.stringify(data));

    return client.get("/api/Lenders/Compare", data);
    
}

const searchResult = (data) => {
    window.localStorage.setItem("searchLoan", JSON.stringify(data));
    return client.get("/api/Lenders/Compare", data);
}

const passRecovery = (data) => {
    ///////////////////////////////////
    //console.log(data);
    ///////////////////////////////////
    return client.post("/api/PasswordManagers/InitiatePasswordReset", data);
}

const tokenValidation = (data) => {
    ///////////////////////////////////
    //console.log(data);
    ///////////////////////////////////
    return client.post("/api/PasswordManagers/ValidateResetPasswordCode", data);
}

const changePassword = (data) => {
    ///////////////////////////////////
    //console.log(data);
    ///////////////////////////////////
    return client.post("/api/PasswordManagers/CompletePasswordReset", data);
}

const getDashboardData = (data) => {
    return client.get(`/api/Dashboard/UserDashboard/${data.userId}`);
}

const getCountries = () => {
    return client.get("/api/Countries");
}

const getState = () => {
    return client.get("/api/States");
}

const userLogout = (data) => {
    return client.post("/api/Auth/Logout", data);
}

const getLoanData = (data) => {
    //console.log(data);
    return client.get("/api/Loans", data);
}

const getLoanTypes = () => {
    return client.get("/api/LoanTypes");
}

const loanApplication = (data) => {
    //console.log(data);
    return client.post("/api/Loans", data);
}

const updatePassword = (data) => {
    const input = {
        "emailAddress": data.emailAddress,
        "oldPassword": data.oldpassword,
        "newPassword": data.newPassword,
        "channel": "web",
        "deviceId": data.deviceId
    }
    //console.log(input);
    return client.post("/api/PasswordManagers/ChangePassword", input);
}

const updateProfile = (data) => {
    //console.log(data);
    return client.put(`/api/Users/${data.userId}`, data);
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
    updatePassword,
    updateProfile,
    searchResult,
};
export default userApis;