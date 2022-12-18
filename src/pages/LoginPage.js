import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import Form from "react-bootstrap/Form";
import logoWhite from "../images/logoWhite.png";
import loaderLogo from "../images/CreditFrame logo.png";
import styles from "../styles/Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import { Modal, Spinner } from "react-bootstrap";


const LoginPage = () => {

    document.title = "Login Page - Creditframes";

    const navigate = useNavigate();

    const location = useLocation();
   //console.log('pathname', location.search);

    const [searchParams] = useSearchParams();

    const returnUrl = searchParams.get("returnUrl");

    const [loader, setLoader] = useState(false);
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

    const userLoginApi = useApi(userApis.login);
    const [login, setLogin] = useState();
    const [errorMessage, setErrorMessage] = useState();


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoader(true);
        // We recommend to call `load` at application startup.
        const fp = await FingerprintJS.load();

        // The FingerprintJS agent is ready.
        // Get a visitor identifier when you'd like to.
        const result = await fp.get();

        // This is the visitor identifier:
        //console.log(result.visitorId);
        const res = await userLoginApi.request({ ...login, password: passwordInput, deviceId: result.visitorId });

        if (res.data.code === 200) {
            setLoader(false);
            window.localStorage.setItem("userData", JSON.stringify(res.data.data));
            if (returnUrl === null) {
                const previousUrl = document.referrer;
                const url = new URL(previousUrl);
                if (url.pathname === "/login" || url.pathname === "/register" || url.pathname === "/password-recovery") {
                    navigate('/dashboard');
                }   
                else { navigate(-1);}             
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
            setLoader(false);
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

    
    return (
        <div className={styles.popBg}>
            <Modal size="sm" show={loader} centered>
                <Modal.Body className="text-center">
                    <Spinner animation="border" style={{ color: "#0000FB", width: "60px", height: "60px", position: "absolute"}} />
                    <img src={loaderLogo} width="30px" height="30px" alt="" style={{margin: "15px" }} />
                </Modal.Body>
            </Modal>
            <div>
                <Link to="/" ><img src={logoWhite} className="mb-4" alt="" /></Link>
                <div className="row col-md-4 m-auto"> 
                    <div className={styles.card}>
                        <h3>Welcome back</h3>
                        <p className="text-center">Please login to your account</p>
                        {errorMessage}
                        <Form onSubmit={handleLogin} className="text-start">
                            <Form.Label className="mt-3">Email Address</Form.Label>
                            <Form.Control type="email" className={styles.input} required onChange={(e) => setLogin({ ...login, email: e.target.value })} placeholder="E.g: username@mail.com"></Form.Control>
                            <Form.Label className="mt-2">Password</Form.Label>
                            <Form.Control type={passwordType} required onChange={handlePasswordChange} value={passwordInput} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType === "password" ? <FaEyeSlash onClick={() => togglePassword()} /> : <FaEye onClick={() => togglePassword()} />}</div>
                            <p style={{ margin: "20px", color: "#424242" }}><label><Form.Check type="checkbox" style={{ height: "15px", width: "15px", float: "left" }}></Form.Check>&nbsp; <span>Remember me</span></label><a href={`/./password-recovery${location.search}`} style={{ float: "right", color: "#FF6367", textDecoration: "none"}}>Forgot Password?</a></p>
                            <button type="submit" className={styles.submit}>{userLoginApi.loading ? "Signing in..." : "Sign in"}</button><button type="reset" id="clear" hidden>Clear</button>
                            <p className="mt-3 text-center">Don't have an account? <a href={`/./register${location.search}`} style={{ color: "#0000FB", fontWeight: "bold", textDecoration: "none" }}>Register</a> </p>
                        </Form>
                    </div>
                </div>
                <div><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
        </div>
    )
}

export default LoginPage;