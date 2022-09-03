import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import styles from "../styles/LoanRequestPage.module.css";
import logo from "../images/CreditFrame-Logo.svg";
import ToggleButton from "react-bootstrap/ToggleButton";
import Modal from "react-bootstrap/Modal";
import statusIcon from "../images/check.png";
import routes from "../routes";



const LoanRequestPage = () => {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("first");
    const [radioValue, setRadioValue] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [business, setBusiness] = useState();
    const [personal, setPersonal] = useState();
    
    const authenticate = () => {
        const user = window.localStorage.getItem("userData");
        console.log(user);
        if (user === null || user === "undefined") {
            navigate(routes.LoginPage);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);

    const radios = [
        { name: 'Personal', value: 'personal', smallText: <span>Get loans designed to meet your specific personal needs.</span> },
        { name: 'Business', value: 'business', smallText: <span>Expand your business with our variety of business loans.</span> },
    ];

    const handleNext = (e) => {
        e.preventDefault();
        if (radioValue === "personal") {
            setActiveTab("second");
        }
        else {
            setActiveTab("third");
        }
    }

    const handleBusiness = (e) => {
        e.preventDefault();
        console.log(business);
        setShow(true);
    }

    const handlePersonal = (e) => {
        e.preventDefault();
        console.log(personal);
        setShow(true);
    }



    return (
        <div>
            <section className={styles.section1}>
                <div className="container mt-5">
                    <div className="row col-md-6 m-auto" hidden={activeTab !== "first"}>
                        <img src={logo} alt="" className={styles.logo} />
                        <h3 align="center" className={styles.title}>Let's get you started</h3>
                        <h4 align="center" className={styles.subTitle}>Select your loan type</h4>
                        <Form onSubmit={handleNext} className={styles.contactForm}>
                            <div className="row">
                                <div className="col-md-12">
                                    {radios.map((radio, idx) => (
                                        <ToggleButton
                                            className={styles.loanType}
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            name="radio"
                                            variant="danger"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        >
                                            {radio.name}{radio.smallText}
                                            
                                        </ToggleButton>
                                    ))}
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className={styles.apply}> Next </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="row col-md-8 m-auto" hidden={activeTab !== "second"}>
                        <img src={logo} alt="" className={styles.logo} />
                        <h3 align="center" className={styles.title}>Personal loan</h3>
                        <h4 align="center" className={styles.subTitle}>Fill all required fields</h4>
                        <Form onSubmit={handlePersonal} className={styles.contactForm}>
                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Loan Amount  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, amount: e.target.value })} placeholder="₦10,000,000.00"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} placeholder="Soji Timothy"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Phone Number  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} placeholder="090XXXXXXXX"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Date Of Birth <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="date" className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, dob: e.target.value })} placeholder="₦10,000,000.00"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Gender  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, gender: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select> 
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Monthly Net Salary <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, mnsalary: e.target.value })} placeholder="₦500,000.00"></Form.Control>
                                </div>
                                <div className="col-md-8">
                                    <Form.Label className={styles.contactLabel}>Employer's Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, employerName: e.target.value })} placeholder="Type your employer's name"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Bank Account  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, bank: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        <option value="access">Access Bank</option>
                                        <option value="citibank">Citibank</option>
                                        <option value="diamond">Diamond Bank</option>
                                        <option value="ecobank">Ecobank</option>
                                        <option value="fidelity">Fidelity Bank</option>
                                        <option value="firstbank">First Bank</option>
                                        <option value="fcmb">First City Monument Bank (FCMB)</option>
                                        <option value="gtb">Guaranty Trust Bank (GTB)</option>
                                        <option value="heritage">Heritage Bank</option>
                                        <option value="keystone">Keystone Bank</option>
                                        <option value="polaris">Polaris Bank</option>
                                        <option value="providus">Providus Bank</option>
                                        <option value="stanbic">Stanbic IBTC Bank</option>
                                        <option value="standard">Standard Chartered Bank</option>
                                        <option value="sterling">Sterling Bank</option>
                                        <option value="suntrust">Suntrust Bank</option>
                                        <option value="union">Union Bank</option>
                                        <option value="uba">United Bank for Africa (UBA)</option>
                                        <option value="unity">Unity Bank</option>
                                        <option value="wema">Wema Bank</option>
                                        <option value="zenith">Zenith Bank</option>
                                    </Form.Select> 
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Residence Address  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, address: e.target.value })} placeholder="No 2 herbert macaulay way"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Email Address  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="email" className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} placeholder="Type your email address"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Landmark  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, landmark: e.target.value })} placeholder="Yaba"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>State of Residence  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, state: e.target.value })} placeholder="Yaba"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Country  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} onChange={(e) => setPersonal({ ...personal, country: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        <option value="Nigeria">Nigeria</option>
                                    </Form.Select> 
                                </div>
                                <div className="col-md-11 m-auto">
                                    <button type="submit" className={styles.apply}> Continue </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="row col-md-8 m-auto" hidden={activeTab !== "third"}>
                        <img src={logo} alt="" className={styles.logo} />
                        <h3 align="center" className={styles.title}>Business loan</h3>
                        <h4 align="center" className={styles.subTitle}>Fill all required fields</h4>
                        <Form onSubmit={handleBusiness} className={styles.contactForm}>
                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Loan Amount  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setBusiness({ ...business, amount: e.target.value })} placeholder="₦10,000,000.00"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setBusiness({ ...business, name: e.target.value })} placeholder="Soji Timothy"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Phone Number  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setBusiness({ ...business, phone: e.target.value })} placeholder="090XXXXXXXX"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Date Of Birth <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="date" className={styles.contactInput} onChange={(e) => setBusiness({ ...business, dob: e.target.value })} placeholder="₦10,000,000.00"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Gender  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} onChange={(e) => setBusiness({ ...business, gender: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Monthly Turnover <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setBusiness({ ...business, monthlyTurnover: e.target.value })} placeholder="₦2,000,000.00"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Business Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setBusiness({ ...business, businessName: e.target.value })} placeholder="Enter here"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Business Registered?  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} onChange={(e) => setBusiness({ ...business, businessStatus: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Bank Account  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} onChange={(e) => setBusiness({ ...business, bank: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        <option value="access">Access Bank</option>
                                        <option value="citibank">Citibank</option>
                                        <option value="diamond">Diamond Bank</option>
                                        <option value="ecobank">Ecobank</option>
                                        <option value="fidelity">Fidelity Bank</option>
                                        <option value="firstbank">First Bank</option>
                                        <option value="fcmb">First City Monument Bank (FCMB)</option>
                                        <option value="gtb">Guaranty Trust Bank (GTB)</option>
                                        <option value="heritage">Heritage Bank</option>
                                        <option value="keystone">Keystone Bank</option>
                                        <option value="polaris">Polaris Bank</option>
                                        <option value="providus">Providus Bank</option>
                                        <option value="stanbic">Stanbic IBTC Bank</option>
                                        <option value="standard">Standard Chartered Bank</option>
                                        <option value="sterling">Sterling Bank</option>
                                        <option value="suntrust">Suntrust Bank</option>
                                        <option value="union">Union Bank</option>
                                        <option value="uba">United Bank for Africa (UBA)</option>
                                        <option value="unity">Unity Bank</option>
                                        <option value="wema">Wema Bank</option>
                                        <option value="zenith">Zenith Bank</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Residence Address  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setBusiness({ ...business, address: e.target.value })} placeholder="No 2 herbert macaulay way"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Email Address  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="email" className={styles.contactInput} onChange={(e) => setBusiness({ ...business, email: e.target.value })} placeholder="Type your email address"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Landmark  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setBusiness({ ...business, landmark: e.target.value })} placeholder="Yaba"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>State of Residence  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setBusiness({ ...business, state: e.target.value })} placeholder="Yaba"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Country  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} onChange={(e) => setBusiness({ ...business, country: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        <option value="Nigeria">Nigeria</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-11 m-auto">
                                    <button type="submit" className={styles.apply}> Continue </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                    {/* <div className="row col-md-5 pt-5 text-center m-auto" hidden={activeTab !== "forth"}>
                        <div className={styles.contactForm}>
                            <img src={statusIcon} alt="" />
                            <h3 align="center" className={styles.sectitle}>Application Successful</h3>
                            <p>Thank you for completing your loan application, kindly click the below button to proceed.</p>
                            <button className={styles.apply}> Proceed </button>
                        </div>
                    </div> */}
                    <div><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
                </div>
            </section>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body className="text-center">
                    <div className={styles.contactForm}>
                        <img src={statusIcon} alt="" />
                        <h3 align="center" className={styles.sectitle}>Application Successful</h3>
                        <p>Thank you for completing your loan application, kindly click the below button to proceed.</p>
                        <button className={styles.apply}> Proceed </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LoanRequestPage;