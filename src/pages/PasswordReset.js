import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import logoWhite from "../images/logoWhite.png";
import message from "../images/message.png";
import styles from "../styles/PasswordRecovery.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReactCodeInput from "react-code-input";


const PasswordReset = () => {

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

    const handleSubmit = async () => {
        return(setActivePage("second"));
    }

    const handleChnagePass = async () => {
        return (setActivePage("third"));
    }

    const props = {
        inputStyle: {
            fontWeight: '500',
            margin: '6px',
            borderRadius: '3px',
            fontSize: '30px',
            width: '60px',
            height: '60px',
            textAlign: 'center',
            backgroundColor: '#FFF',
            color: '#282828',
            border: '1px solid #ADADAD'
        }
    };

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
                <img src={logoWhite} className="mb-4" alt="" />
                <div className="row col-md-4 m-auto">
                    <div className={styles.card}>
                        <h3>Password Recovery</h3>
                        <p>Enter the code sent to your email</p>
                        <Form className="text-center mt-5 mb-2">
                            <ReactCodeInput type="text" fields={4} {...props} />
                        </Form>
                            <button onClick={() => handleSubmit()} className={styles.submit}>Continue</button>
                            <p style={{marginTop: "20px", fontSize: "15px"}}>Didn't get the code? <Link to="" onClick={() => setActivePage("second")} style={{ color: "#0000FB", fontWeight: "bold", textDecoration: "none" }}>Resend</Link> </p>
                    </div>
                </div>
                <div style={{position: "absolute", bottom: "0", width: "98%", textAlign: "center"}}><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
            <div hidden={activePage !== "second"}>
                <img src={logoWhite} className="mb-4" alt="" />
                <div className="row px-4 col-md-4 m-auto">
                    <div className={styles.card}>
                        <h3>New Password</h3>
                        <p style={{ fontSize: "18px" }}>... perharps something easier</p>
                        <Form className="text-start mt-2 mb-2">
                            <Form.Label className="mt-2">Password</Form.Label>
                            <Form.Control type={passwordType} onChange={handlePasswordChange} value={passwordInput} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType === "password" ? <FaEyeSlash onClick={togglePassword} /> : <FaEye onClick={togglePassword} />}</div>
                            <Form.Label className="mt-2">Confirm Password</Form.Label>
                            <Form.Control type={passwordType1} onChange={handlePasswordChange1} value={passwordInput1} className={styles.input} placeholder="***************"></Form.Control><div className={styles.pass} >{passwordType1 === "password" ? <FaEyeSlash onClick={togglePassword1} /> : <FaEye onClick={togglePassword1} />}</div>
                        </Form>
                            <button type="submit" onClick={() => handleChnagePass()} className={styles.submit}>Continue</button>
                        <p style={{ marginTop: "20px", fontSize: "15px" }}>Don't have an account? <Link to="/login-register" style={{ color: "#0000FB", fontWeight: "bold", textDecoration: "none" }}>Register</Link> </p>
                    </div>
                </div>
                <div style={{ position: "absolute", bottom: "0", width: "98%", textAlign: "center" }}><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
            <div hidden={activePage !== "third"}>
                <img src={logoWhite} className="mb-4" alt="" />
                <div className="row px-4 col-md-4 m-auto">
                    <div className={styles.card}>
                        <img src={message} alt="" />
                        <h3>Well done!</h3>
                        <p style={{ fontSize: "18px" }}>Password successfully change</p>
                        <button onClick={() => setActivePage("second")} className={styles.submit}>Go to dashboard</button>
                    </div>
                </div>
                <div style={{ position: "absolute", bottom: "0", width: "98%", textAlign: "center" }}><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
        </div>
    )
}

export default PasswordReset;