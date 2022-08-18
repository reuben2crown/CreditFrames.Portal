import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import Form from "react-bootstrap/Form";
import logoWhite from "../images/logoWhite.png";
import message from "../images/message.png";
import styles from "../styles/PasswordRecovery.module.css";


const PasswordRecovery = () => {

    const navigate = useNavigate();

    const [activePage, setActivePage] = useState("first");

    const handleSubmit = async () => {
        return(setActivePage("second"));
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
            <div hidden={activePage !== "first"}>
                <img src={logoWhite} className="mb-4" alt="" />
                <div className="row col-md-4 m-auto">
                    <div className={styles.card}>
                        <h3>Password Recovery</h3>
                        <p>How do you want retrieve <br />your password?</p>
                        <Form className="text-center">
                            <div className="mt-4 mx-5 text-start">
                                <Form.Check type="radio" name="options" aria-label="radio 1" style={{display: "inline-block", verticalAlign: "top" }} />
                                <Form.Label style={{ display: "inline-block", wordBreak: "break-all", fontSize: "18px", color: "#38403A" }}>Get the code by text message <br />(SMS) at +234 703 320 8626</Form.Label>
                            </div>
                            <div className="mt-4 mb-3 mx-5 text-start">
                                <Form.Check type="radio" name="options" aria-label="radio 1" style={{ display: "inline-block", verticalAlign: "top" }} />
                                <Form.Label style={{ display: "inline-block", wordBreak: "break-all", fontSize: "18px", color: "#38403A" }}>Get the code by email <br />samsey•••••••@gmail.com</Form.Label>
                            </div>
                            {/* <div>
                                <input type="radio" style={{heigth: "50px", width: "50px"}}></input>
                                <Form.Label className="mt-2">Get the code by email samsey•••••••@gmail.com</Form.Label>
                            </div> */}
                        </Form>
                            <button onClick={() => handleSubmit()} className={styles.submit}>Continue</button>
                    </div>
                </div>
                <div style={{position: "absolute", bottom: "0", width: "98%", textAlign: "center"}}><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
            <div hidden={activePage !== "second"}>
                <img src={logoWhite} className="mb-4" alt="" />
                <div className="row col-md-4 m-auto">
                    <div className={styles.card}>
                        <img src={message} alt="" />
                        <h3>Check your email</h3>
                        <p style={{fontSize: "18px"}}>We have sent a password reset code to the email address you provided in the previous screen.</p>
                        <button type="submit" onClick={() => handleSendCode()} className={styles.submit1}>Continue</button>
                    </div>
                </div>
                <div style={{ position: "absolute", bottom: "0", width: "98%", textAlign: "center" }}><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
            </div>
        </div>
    )
}

export default PasswordRecovery;