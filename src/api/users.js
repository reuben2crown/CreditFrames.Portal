import client from "./client";

const login = (data) => {

    const input = {
        "emailAddress": data.email,
        "password": data.password,
        "loginChannel": "Web",
        "deviceId": data.deviceId,
    };
    console.log(input);

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
    const loanType = data.loanType;
    const amount = data.amount;
    return client.post(`/api/Lenders/Compare?LoanTypeId=${loanType}&Amount=${amount}`);
}

const tokenValidation = (data) => {
    ///////////////////////////////////
    console.log(data);
    ///////////////////////////////////
    return client.post("api/PasswordManagers/ValidateResetPasswordCode", data);
}

const changePassword = (data) => {
    ///////////////////////////////////
    console.log(data);
    ///////////////////////////////////
    return client.post("/api/PasswordManagers/CompletePasswordReset", data);
}

const getDashboardData = (data) => {
    
    return client.get(`/api/Dashboard/UserDashboard/${data}`);

}

const getCountries = () => {
    return client.get("/api/Countries");
}


const userApis = { 
    login,
    register,
    searchLoan,
    tokenValidation,
    changePassword,
    contact,
    getDashboardData,
    getCountries,
};
export default userApis;