import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import Form from "react-bootstrap/Form";
import logoWhite from "../images/logoWhite.png";
import styles from "../styles/Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import routes from "../routes";


const LoginPage = () => {

    document.title = "Login & Register Page - Creditframes";

    const navigate = useNavigate();

    const location = useLocation();
   //console.log('pathname', location.search);

    const [searchParams, setSearchParams] = useSearchParams();

    const returnUrl = searchParams.get("returnUrl");

    const [activePage, setActivePage] = useState("first");
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordInput1, setPasswordInput1] = useState("");
    const handlePasswordChange1 = (evnt) => {
        setPasswordInput1(evnt.target.value);
    }
    const togglePassword1 = () => {
        if (passwordType1 === "password") {
            setPasswordType1("text")
            return;
        }
        setPasswordType1("password")
    }

    const userLoginApi = useApi(userApis.login);
    const userRegisterApi = useApi(userApis.register);
    const [login, setLogin] = useState();
    const [register, setRegister] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [errorMessage1, setErrorMessage1] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [passValidation, setPassValidation] = useState();


    const handleLogin = async (e) => {
        e.preventDefault();
        // We recommend to call `load` at application startup.
        const fp = await FingerprintJS.load();

        // The FingerprintJS agent is ready.
        // Get a visitor identifier when you'd like to.
        const result = await fp.get();

        // This is the visitor identifier:
        //console.log(result.visitorId);
        const res = await userLoginApi.request({ ...login, password: passwordInput, deviceId: result.visitorId });

        if (res.data.code === 200) {
            window.localStorage.setItem("userData", JSON.stringify(res.data.data));
            if (returnUrl === null) {
                navigate(-1);
            } 
            if (returnUrl) {
                navigate(returnUrl);
            }
            //if (window.localStorage.getItem("prevUrl")) {
                //navigate(routes.LoanRequestPage);
            //}
            //else navigate(-1);
        }
        if (res.data.code === 400) {
            const message = <Alert key="danger" variant="danger" style={{ fontSize: "16px" }}> {res.data.message} </Alert>;
            setErrorMessage(message);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        // We recommend to call `load` at application startup.
        const fp = await FingerprintJS.load();

        // The FingerprintJS agent is ready.
        // Get a visitor identifier when you'd like to.
        const result = await fp.get();

        // This is the visitor identifier:
        //console.log(result.visitorId);
        const res = await userRegisterApi.request({ ...register, password: passwordInput, password1: passwordInput1, deviceId: result.visitorId });

        if (res.status === 200) {
            window.localStorage.setItem("userData", JSON.stringify(res.data.data));
            if (returnUrl === null) {
                navigate(-1);
            } else {
                navigate(returnUrl);
            }
            navigate(-1);
        }
        if (res.status === 400) {
            const message = <Alert key="danger" variant="danger" style={{ fontSize: "16px" }}> {res.data.message} </Alert>;
            setErrorMessage1(message);
        }
    }

    /////////////////////////////////////////////////////////////////////
    const [screenSize, getDimension] = useState({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight
    });
    const setDimension = () => {
        getDimension({
            dynamicWidth: window.innerWidth,
            dynamicHeight: window.innerHeight
        })
    }

    useEffect(() => {
        window.addEventListener('resize', setDimension);

        return (() => {
            window.removeEventListener('resize', setDimension);
        })
    }, [screenSize])

    ////////////////////////////////////////////////////////////////////////

    const handleReset = () => {
        document.getElementById("clear").click();
    }
    const handleReset1 = () => {
        document.getElementById("clear1").click();
    }

    
    return (
        <div className={styles.popBg}>
            <div hidden={activePage !== "first"}>
                <Link to="/" ><img src={logoWhite} className="mb-4" alt="" /></Link>
                <div className="row col-md-4 m-auto"> 
                    <div className={styles.card}>
                        <h3>Welcome back</h3>
                        <p>Please login to your account</p>
                        {errorMessage}
                        <Form onSubmit={handleLogin} className="text-start">
                            <Form.Label className="mt-3">Email Address</Form.Label>
                            <Form.Control type="email" className={styles.input} required onChange={(e) => setLogin({ ...login, email: e.target.value })} placeholder="E.g: username@mail.com"></Form.Control>
                            <Form.Label className="mt-2">Password</Form.Label>
                            <Form.Control type={passwordType} required onChange={handlePasswordChange} value={passwordInput} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType === "password" ? <FaEyeSlash onClick={() => togglePassword()} /> : <FaEye onClick={() => togglePassword()} />}</div>
                            <p style={{ margin: "20px", color: "#424242" }}><Form.Check type="checkbox" style={{ height: "15px", width: "15px", float: "left" }}></Form.Check>&nbsp; <span>Remember me</span><Link to={`/./password-recovery${location.search}`} style={{ float: "right", color: "#FF6367", textDecoration: "none"}}>Forgot Password?</Link></p>
                            <button type="submit" className={styles.submit}>{userLoginApi.loading ? "Signing in..." : "Sign in"}</button><button type="reset" id="clear" hidden>Clear</button>
                            <p className="mt-3 text-center">Don't have an account? <Link to={`/./login-register${location.search}`} onClick={() => { setActivePage("second"); handleReset1()}} style={{ color: "#0000FB", fontWeight: "bold", textDecoration: "none" }}>Register</Link> </p>
                        </Form>
                    </div>
                </div>
                <div><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
            <div hidden={activePage !== "second"}>
                <Link to="/" ><img src={logoWhite} className="mb-2" alt="" /></Link>
                <div className="row col-md-4 m-auto">
                    <div className={styles.card}>
                        <h3>Create account</h3>
                        <p className="mb-3">We're delight you're joining us.</p>
                        {errorMessage1}{successMessage}
                        <Form onSubmit={handleRegister} className="text-start">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" required className={styles.input}  onChange={(e) => setRegister({ ...register, firstName: e.target.value })} placeholder="Enter firstname"></Form.Control>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" required className={styles.input} onChange={(e) => setRegister({ ...register, lastName: e.target.value })} placeholder="Enter lastname"></Form.Control>
                            <Form.Label className="mt-1">Phone Number</Form.Label>
                            <Form.Control type="text" required className={styles.input} onChange={(e) => setRegister({ ...register, phone: e.target.value })} placeholder="0000 000 0000"></Form.Control>
                            <Form.Label className="mt-1">Email</Form.Label>
                            <Form.Control type="email" required className={styles.input} onChange={(e) => setRegister({ ...register, email: e.target.value })} placeholder="username@mail.com"></Form.Control>
                            <Form.Label className="mt-2">Password</Form.Label>
                            <Form.Control type={passwordType} required onChange={handlePasswordChange} value={passwordInput} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType === "password" ? <FaEyeSlash onClick={() => togglePassword()} /> : <FaEye onClick={() => togglePassword()} />}</div>
                            <Form.Label className="mt-2">Confirm Password &nbsp; &nbsp; &nbsp; &nbsp; {passwordInput !== passwordInput1 ? <span className="text-danger">Password does not match.</span> : passwordInput.length > 0 && passwordInput1.length > 0 && passwordInput === passwordInput1 ? <span className="text-success">Password match.</span> : <></> }</Form.Label>
                            <Form.Control type={passwordType1} required onChange={handlePasswordChange1} value={passwordInput1} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType1 === "password" ? <FaEyeSlash onClick={() => togglePassword1()} /> : <FaEye onClick={() => togglePassword1()} />}</div>
                            <button type="submit" disabled={passwordInput.length > 0 && passwordInput1.length > 0 && passwordInput === passwordInput1 ? false : true} className={styles.submit1}>{userRegisterApi.loading ? "Creating your account..." : "Create account"}</button><button type="reset" id="clear1" hidden>Clear</button>
                            <p className="mt-3 text-center">Already have an account? <Link to={`/./login-register${location.search}`} onClick={() => {setActivePage("first"); handleReset()}} style={{ color: "#0000FB", fontWeight: "bold", textDecoration: "none" }}>Login</Link> </p>
                        </Form>
                    </div>
                </div>
                <div><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
        </div>
    )
}

export default LoginPage;