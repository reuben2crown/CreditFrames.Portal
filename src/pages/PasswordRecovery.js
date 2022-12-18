import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";
import Form from "react-bootstrap/Form";
import logoWhite from "../images/logoWhite.png";
import message from "../images/message.png";
import styles from "../styles/PasswordRecovery.module.css";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import Alert from "react-bootstrap/Alert";
import { Modal, Spinner } from "react-bootstrap"; 
import loaderLogo from "../images/CreditFrame logo.png";


const PasswordRecovery = () => {
    
    document.title = "Password Recovery Page - Creditframes";
    
    const navigate = useNavigate();
    
    const location = useLocation();
    //console.log('pathname', location.search);
    
    const [loader, setLoader] = useState(false);
    const [activePage, setActivePage] = useState("first");
    const [passRecovery, setPassRecovery] = useState();
    const passRecoveryApi = useApi(userApis.passRecovery);
    const [errorMessage, setErrorMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const res = await passRecoveryApi.request({...passRecovery, channel: "web"});

        if (res.data.code === 200) {
            setLoader(false);
            return(setActivePage("second"));
        }
        if (res.data.code === 400 || res.data.code === 500) {
            const message = <Alert key="danger" variant="danger" style={{ fontSize: "16px" }}> {res.data.message} </Alert>;
            setErrorMessage(message);
            setLoader(false);
        }
    }

    const handleSendCode = () => {
        return (navigate(routes.PasswordReset));
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
            <Modal size="sm" show={loader} centered>
                <Modal.Body className="text-center">
                    <Spinner animation="border" style={{ color: "#0000FB", width: "60px", height: "60px", position: "absolute" }} />
                    <img src={loaderLogo} width="30px" height="30px" alt="" style={{ margin: "15px" }} />
                </Modal.Body>
            </Modal>
            <div hidden={activePage !== "first"}>
                <Link to="/"><img src={logoWhite} className="mb-4" alt="" /></Link>
                <div className="row col-md-4 m-auto">
                    <div className={styles.card}>
                        <h3>Password Recovery</h3>
                        <p className="text-center">Please enter your registered email address to retrieve your password.</p>
                        {errorMessage}
                        <Form onSubmit={handleSubmit} className="text-center mb-3">
                            {/* <div className="mt-4 mx-5 text-start">
                                <Form.Check type="radio" name="options" aria-label="radio 1" style={{display: "inline-block", verticalAlign: "top" }} />
                                <Form.Label style={{ display: "inline-block", wordBreak: "break-all", fontSize: "18px", color: "#38403A" }}>Get the code by text message <br />(SMS) at +234 703 320 8626</Form.Label>
                            </div>
                            <div className="mt-4 mb-3 mx-5 text-start">
                                <Form.Check type="radio" name="options" aria-label="radio 1" style={{ display: "inline-block", verticalAlign: "top" }} />
                                <Form.Label style={{ display: "inline-block", wordBreak: "break-all", fontSize: "18px", color: "#38403A" }}>Get the code by email <br />samsey•••••••@gmail.com</Form.Label>
                            </div> */}
                            <div className="mt-2 mb-4 text-start">
                                <Form.Label className="mt-3">Email Address</Form.Label>
                                <Form.Control type="email" className={styles.input} required onChange={(e) => setPassRecovery({ ...passRecovery, emailAddress: e.target.value })} placeholder="username@mail.com"></Form.Control>
                            </div>
                            {/* <div>
                                <input type="radio" style={{heigth: "50px", width: "50px"}}></input>
                                <Form.Label className="mt-2">Get the code by email samsey•••••••@gmail.com</Form.Label>
                            </div> */}
                            <button type="submit" className={styles.submit}>{passRecoveryApi.loading ? "Submiting..." : "Continue"}</button>
                        </Form>
                        <a href={`/./login${location.search}`} style={{textDecoration: "none", fontWeight: "bold", fontSize: "18px"}}>Back to login</a>
                    </div>
                </div>
                <div style={{position: "absolute", bottom: "0", width: "98%", textAlign: "center"}}><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
            <div hidden={activePage !== "second"}>
                <Link to="/"><img src={logoWhite} className="mb-4" alt="" /></Link>
                <div className="row col-md-4 m-auto">
                    <div className={styles.card}>
                        <img src={message} alt="" />
                        <h3>Check your email</h3>
                        <p className="text-center" style={{fontSize: "18px"}}>We have sent a password reset code to the email address you provided in the previous screen.</p>
                        <button type="submit" onClick={() => handleSendCode()} className={styles.submit1}>Continue</button>
                    </div>
                </div>
                <div style={{ position: "absolute", bottom: "0", width: "98%", textAlign: "center" }}><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
        </div>
    )
}

export default PasswordRecovery;