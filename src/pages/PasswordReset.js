import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import logoWhite from "../images/logoWhite.png";
import statusIcon from "../images/check.png";
import styles from "../styles/PasswordRecovery.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReactCodeInput from "react-code-input";
import userApis from "../api/users";
import useApi from "../hooks/useApi";
import Alert from "react-bootstrap/Alert";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import routes from "../routes";


const PasswordReset = () => {

    document.title = "Password Reset Page - Creditframes";

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const uid = searchParams.get("uid");
    const token = searchParams.get("token");

    const tokenValidationApi = useApi(userApis.tokenValidation);
    const changePasswordApi = useApi(userApis.changePassword);
    const [errorMessage, setErrorMessage] = useState();
    const [errorMessage1, setErrorMessage1] = useState();

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

    useEffect(() => {
        console.log(uid, token);
        tokenValidation();
    }, []); 

    const tokenValidation = async () => {
        const res = await tokenValidationApi.request({ userId: uid, passwordResetToken: token });
        console.log(res.data); 
        if (res.data.code === 200) {
            return (setActivePage("second"));
        }
        if (res.data.code === 400) {
            const message = <Alert key="danger" variant="danger" style={{ fontSize: "16px" }}> {res.data.message} </Alert>;
            setErrorMessage(message);
        }
    };

    const handleChangePass = async (e) => {
        e.preventDefault();
        // We recommend to call `load` at application startup.
        const fp = await FingerprintJS.load();

        // The FingerprintJS agent is ready.
        // Get a visitor identifier when you'd like to.
        const result = await fp.get();

        // This is the visitor identifier:
        //console.log(result.visitorId);
        const resetData = { userId: uid, newPassword: passwordInput, passwordResetToken: token, channel: "Web", deviceId: result.visitorId };
        const res = await changePasswordApi.request(resetData);
        if (res.status === 200) {
            return (setActivePage("third"));
        }
        if (res.status === 400 || res.status === 500) {
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

    return (
        <div className={styles.popBg} style={{ height: `${screenSize.dynamicHeight}px` }}>
            <div hidden={activePage !== "first"}>
                <Link to="/"><img src={logoWhite} className="mb-5" alt="" /></Link>
                <div className="row col-md-4 m-auto">
                    <div className={styles.card}>
                        <h3>Token Validation Status</h3>
                        <h4 className="mt-5">{errorMessage}</h4>
                    </div>
                </div>
                <div style={{position: "absolute", bottom: "0", width: "98%", textAlign: "center"}}><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
            <div hidden={activePage !== "second"}>
                <Link to="/"><img src={logoWhite} className="mb-4" alt="" /></Link>
                <div className="row px-4 col-md-4 m-auto">
                    <div className={styles.card}>
                        <h3>New Password</h3>
                        <p style={{ fontSize: "18px" }}>... perharps something easier</p>
                        <p>{errorMessage1}</p>
                        <Form onSubmit={handleChangePass} className="text-start mt-0 mb-0">
                            <Form.Label className="mt-2">Password</Form.Label>
                            <Form.Control type={passwordType} onChange={handlePasswordChange} value={passwordInput} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType === "password" ? <FaEyeSlash onClick={() => togglePassword()} /> : <FaEye onClick={() => togglePassword()} />}</div>
                            <Form.Label className="mt-2">Confirm Password&nbsp; &nbsp; &nbsp; &nbsp; {passwordInput !== passwordInput1 ? <span className="text-danger">Password does not match.</span> : passwordInput.length > 0 && passwordInput1.length > 0 && passwordInput === passwordInput1 ? <span className="text-success">Password match.</span> : <></>}</Form.Label>
                            <Form.Control type={passwordType1} onChange={handlePasswordChange1} value={passwordInput1} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType1 === "password" ? <FaEyeSlash onClick={() => togglePassword1()} /> : <FaEye onClick={() => togglePassword1()} />}</div>
                        <button type="submit" disabled={passwordInput.length > 0 && passwordInput1.length > 0 && passwordInput === passwordInput1 ? false : true} className={styles.submit}>Continue</button>
                        </Form>
                        <p style={{ marginTop: "20px", fontSize: "15px" }}>Don't have an account? <Link to="/login-register" style={{ color: "#0000FB", fontWeight: "bold", textDecoration: "none" }}>Register</Link> </p>
                    </div>
                </div>
                <div style={{ position: "absolute", bottom: "0", width: "98%", textAlign: "center" }}><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
            <div hidden={activePage !== "third"}>
                <Link to="/"><img src={logoWhite} className="mb-4" alt="" /></Link>
                <div className="row px-4 col-md-4 m-auto">
                    <div className={styles.card}>
                        <img src={statusIcon} alt="" />
                        <h3>Well done!</h3>
                        <p style={{ fontSize: "18px" }}>Password successfully change</p>
                        <button onClick={() => navigate(routes.LoginPage)} className={styles.submit}>Go to dashboard</button>
                    </div>
                </div>
                <div style={{ position: "absolute", bottom: "0", width: "98%", textAlign: "center" }}><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
        </div>
    )
}

export default PasswordReset;