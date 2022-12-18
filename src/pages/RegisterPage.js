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


const RegisterPage = () => {

    document.title = "Registeration Page - Creditframes";

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

    const userRegisterApi = useApi(userApis.register);
    const [register, setRegister] = useState();
    const [errorMessage1, setErrorMessage1] = useState();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoader(true);
        // We recommend to call `load` at application startup.
        const fp = await FingerprintJS.load();

        // The FingerprintJS agent is ready.
        // Get a visitor identifier when you'd like to.
        const result = await fp.get();

        // This is the visitor identifier:
        //console.log(result.visitorId);
        const res = await userRegisterApi.request({ ...register, password: passwordInput, password1: passwordInput1, deviceId: result.visitorId });

        if (res.status === 200) {
            setLoader(false);
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
                <Link to="/" ><img src={logoWhite} className="mb-2" alt="" /></Link>
                <div className="row col-md-4 m-auto">
                    <div className={styles.card}>
                        <h3>Create account</h3>
                        <p className="mb-3 text-center">We're delight you're joining us.</p>
                        {errorMessage1}
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
                            <p className="mt-3 text-center">Already have an account? <a href={`/./login${location.search}`} style={{ color: "#0000FB", fontWeight: "bold", textDecoration: "none" }}>Login</a> </p>
                        </Form>
                    </div>
                </div>
                <div><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
        </div>
    )
}

export default RegisterPage;