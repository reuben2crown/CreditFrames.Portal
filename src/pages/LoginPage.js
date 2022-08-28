import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import Form from "react-bootstrap/Form";
import logoWhite from "../images/logoWhite.png";
import styles from "../styles/Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from 'react-bootstrap/Alert';
import routes from "../routes";


const LoginPage = () => {

    const navigate = useNavigate();
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


    const userApi = useApi(userApis.login);
    const [login, setLogin] = useState();
    const [register, setRegister] = useState();
    const [errorMessage, setErrorMessage] = useState();


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log({login, password: passwordInput});
        const result = await userApi.request({ ...login, password: passwordInput });

        if (result.data.code === 200) {
            window.localStorage.setItem("userData", result.data);
            return navigate(routes.LandingPage);
        }
        if (result.data.code === 400) {
            window.localStorage.setItem("userData", JSON.stringify(result.data));
            const message = <Alert key="danger" variant="danger" style={{ fontSize: "14px" }}> {result.data.message} </Alert>;
            setErrorMessage(message);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(register);
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
            <div hidden={activePage !== "first"}>
                <img src={logoWhite} className="mb-4" alt="" />
                <div className="row col-md-4 m-auto"> 
                    <div className={styles.card}>
                        <h3>Welcome back</h3>
                        <p>Please login to your account</p>
                        {errorMessage}
                        <Form onSubmit={handleLogin} className="text-start">
                            <Form.Label className="mt-3">Email Address</Form.Label>
                            <Form.Control type="email" className={styles.input} onChange={(e) => setLogin({ ...login, email: e.target.value })} placeholder="samseyi00@gmail.com"></Form.Control>
                            <Form.Label className="mt-2">Password</Form.Label>
                            <Form.Control type={passwordType} onChange={handlePasswordChange} value={passwordInput} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType === "password" ? <FaEyeSlash onClick={togglePassword} /> : <FaEye onClick={togglePassword} />}</div>
                            <p style={{ margin: "20px", color: "#424242" }}><Form.Check type="checkbox" style={{ height: "15px", width: "15px", float: "left" }}></Form.Check>&nbsp; <span>Remember me</span><Link to="/password-recovery" style={{ float: "right", color: "#FF6367", textDecoration: "none"}}>Forgot Password?</Link></p>
                            <button type="submit" className={styles.submit}>Sign in</button>
                            <p className="mt-3 text-center">Don't have an account? <Link to="" onClick={() => setActivePage("second")} style={{ color: "#0000FB", fontWeight: "bold", textDecoration: "none" }}>Register</Link> </p>
                        </Form>
                    </div>
                </div>
                <div><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
            <div hidden={activePage !== "second"}>
                <img src={logoWhite} className="mb-2" alt="" />
                <div className="row col-md-4 m-auto">
                    <div className={styles.card}>
                        <h3>Create account</h3>
                        <p className="mb-3">We're delight you're joining us.</p>
                        <Form onSubmit={handleRegister} className="text-start">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" className={styles.input} placeholder="Sam Seyi"></Form.Control>
                            <Form.Label className="mt-1">Phone Number</Form.Label>
                            <Form.Control type="text" className={styles.input} placeholder="0000 000 0000"></Form.Control>
                            <Form.Label className="mt-1">Email</Form.Label>
                            <Form.Control type="email" className={styles.input} placeholder="samseyi00@gmail.com"></Form.Control>
                            <Form.Label className="mt-2">Password</Form.Label>
                            <Form.Control type={passwordType} onChange={handlePasswordChange} value={passwordInput} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType === "password" ? <FaEyeSlash onClick={togglePassword} /> : <FaEye onClick={togglePassword} />}</div>
                            <Form.Label className="mt-2">Confirm Password</Form.Label>
                            <Form.Control type={passwordType1} onChange={handlePasswordChange1} value={passwordInput1} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType1 === "password" ? <FaEyeSlash onClick={togglePassword1} /> : <FaEye onClick={togglePassword1} />}</div>
                            <button type="submit" className={styles.submit1}>Create account</button>
                            <p className="mt-3 text-center">Already have an account? <Link to="" onClick={() => setActivePage("first")} style={{ color: "#0000FB", fontWeight: "bold", textDecoration: "none" }}>Login</Link> </p>
                        </Form>
                    </div>
                </div>
                <div><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
        </div>
    )
}

export default LoginPage;