import React, { useState, useEffect } from "react";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/SettingsPage.module.css";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";
import { BsArrowLeft } from "react-icons/bs";
import profile from "../../images/profile.svg";
import security from "../../images/security.svg";
import countryChange from "../../images/countryChange.svg";
import smallArrowRight from "../../images/small-arrow-right.svg";
import { FaArrowRight } from "react-icons/fa";
import { Form, Modal } from "react-bootstrap";
import userApis from "../../api/users";
import useApi from "../../hooks/useApi";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import jwtDecode from "jwt-decode";


const SettingsPage = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [button, setButton] = useState(false);
    const [activePage, setActivePage] = useState("first");

    const authenticate = () => {
        const user = window.localStorage.getItem("userData");
        if (user === null || user === "undefined") {
            navigate(routes.LoginPage);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);
    
    const [changePassword, setChangePassword] = useState();
    const updatePasswordApi = useApi(userApis.updatePassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fp = await FingerprintJS.load();

        // The FingerprintJS agent is ready.
        // Get a visitor identifier when you'd like to.
        const result = await fp.get();
        const user = JSON.parse(localStorage.getItem("userData"));
        const decodedData = jwtDecode(user.accessToken);
        const newData = JSON.parse(decodedData.UserData);
        const res = await updatePasswordApi.request({ ...changePassword, emailAddress: newData.emailAddress, deviceId: result.visitorId, channel: "web"});
        if (res.status.code === 200) {
            setActivePage("third");
        }
    }

    return (
        <div>
            <NavMenu />
            <section className={styles.dashboardbg}> 
                <div className="row m-0">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className={styles.pageContent}>
                            <h4 className={styles.pageTitle}><BsArrowLeft style={{ marginRight: "5px", verticalAlign: "top" }} /> Settings </h4>
                        </div>
                        <div className="row col-md-10 mt-4">
                            <div className={styles.cardTable1}>
                                <div className={styles.cardInside}>
                                    <th>Account Settings</th>
                                </div>
                                <div className={styles.cardInside1}>
                                    <div className="row">
                                        <div className="col-md-1"><img src={profile} alt="" /></div>
                                        <div className="col-md-10"><h4>Profile</h4><span>Add or edit your personal details</span></div>
                                        <div className="col-md-1"><img src={smallArrowRight} onClick={() => setShow(true)} className={styles.arrowIcon} alt="" /></div>
                                    </div>
                                    <div><hr /></div>
                                    <div className="row">
                                        <div className="col-md-1"><img src={security} width="100%" alt="" /></div>
                                        <div className="col-md-10"><h4>Security</h4><span>Settings to keep your account safe</span></div>
                                        <div className="col-md-1"><img src={smallArrowRight} className={styles.arrowIcon} alt="" /></div>
                                    </div>
                                    <div><hr /></div>
                                    <div className="row">
                                        <div className="col-md-1"><img src={countryChange} width="100%" alt="" /></div>
                                        <div className="col-md-10"><h4>Choose Country/Region</h4><span>Select your preferred country/region</span></div>
                                        <div className="col-md-1"><img src={smallArrowRight} className={styles.arrowIcon} alt="" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={show} centered>
                <Modal.Body className="mb-3">
                    <Form onSubmit={() => handleSubmit()}>
                        { activePage === "first" && <div>
                            <div className={styles.cardModal}>
                                <th>Security Check</th>
                            </div>
                            <div className={styles.cardModal1}>
                                <div className="col-md-12">
                                    <Form.Control type="text" required className={styles.contactInput} onChange={(e) => setChangePassword({ ...changePassword, oldpassword: e.target.value })} placeholder="Enter current password"></Form.Control>
                                </div>
                            </div>
                            <div className="text-center"><button type="button" onClick={() => setShow(false)} className={styles.cancel}> Cancel </button><button type="button" onClick={() => setActivePage("second")} className={styles.apply}> Next </button></div>
                        </div>}
                        {activePage === "second" &&<div>
                            <div className={styles.cardModal}>
                                <th>Change Password</th>
                            </div>
                            <div className={styles.cardModal1}>
                                <div className="col-md-12">
                                    <Form.Control type="text" required className={styles.contactInput} onChange={(e) => setChangePassword({ ...changePassword, newPassword: e.target.value })} placeholder="New Password"></Form.Control>
                                </div>
                                <div className="col-md-12">
                                    <label style={{color: "green !important"}}>{changePassword.newPassword === changePassword.confirmPassword ? "Password match" : "Password does not match"}</label>
                                    <Form.Control type="text" required  className={styles.contactInput} onChange={(e) => setChangePassword({ ...changePassword, confirmPassword: e.target.value })} placeholder="Confirm New Password"></Form.Control>
                                </div>
                            </div>
                            <div className="text-center"><button type="button" onClick={() => setShow(false)} className={styles.cancel}> Cancel </button><button type="submit" disabled={changePassword.newPassword === changePassword.confirmPassword ? false : true} className={styles.apply}> Save </button></div>
                        </div>}
                        {activePage === "third" && <div>
                            <div className={styles.cardModal}>
                                <th>Confirmation Message</th>
                            </div>
                            <div className={styles.cardModal1}>
                                <div className="col-md-12">
                                    <h4>Your password has been changed successfully</h4>
                                </div>
                            </div>
                            <div className="text-center"><button type="button" onClick={() => setShow(false)} className={styles.cancel}> Close </button></div>
                        </div>}
                    </Form>
                </Modal.Body>
            </Modal>
            <Footer />
        </div>
    )
}

export default SettingsPage;