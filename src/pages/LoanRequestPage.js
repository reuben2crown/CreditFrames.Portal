import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import styles from "../styles/LoanRequestPage.module.css";
import logo from "../images/CreditFrame-Logo.svg";
import ToggleButton from "react-bootstrap/ToggleButton";
import Modal from "react-bootstrap/Modal";
import statusIcon from "../images/check.png";
import routes from "../routes";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import jwtDecode from "jwt-decode";
import { Alert } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import FingerprintJS from "@fingerprintjs/fingerprintjs";



const LoanRequestPage = () => {

    document.title = "Loan Request Page - Creditframes";

    const navigate = useNavigate();

    const location = useLocation();
    // console.log('pathname', location.pathname);
    // console.log('search', location.search);

    // const urlData = location.pathname+location.search;

    const [searchParams, setSearchParams] = useSearchParams();

    const loanType = searchParams.get("loanType");
    const loanAmount = searchParams.get("loanAmount");

    const [currency, setCurrency] = useState();
    const [newData, setNewData] = useState();
    const [search, setSearch] = useState();

    useEffect(() => {
        if (localStorage.getItem("countrySelected") !== null && localStorage.getItem("countrySelected") !== undefined) {
            const currency = JSON.parse(localStorage.getItem("countrySelected"));
            setCurrency(currency.currencyCode);
        };
        if (localStorage.getItem("userData") !== null && localStorage.getItem("userData") !== undefined) {
            const user = JSON.parse(localStorage.getItem("userData"));
            const decodedData = jwtDecode(user.accessToken);
            setNewData(JSON.parse(decodedData.UserData));
        }
        // if (localStorage.getItem("searchResult") !== null && localStorage.getItem("searchResult") !== undefined) {
        //     const search = JSON.parse(localStorage.getItem("searchResult"));
        //     setSearch(search);
        // }
    }, []);
    

    const [activeTab, setActiveTab] = useState("first");
    //const [radioValue, setRadioValue] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loanApplication, setLoanApplication] = useState();
    const loanApplicationApi = useApi(userApis.loanApplication);
    
    const authenticate = () => {
        if (localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined) {
            navigate(routes.LoginPage);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);

    // const radios = [
    //     { name: 'Personal', value: 'personal', smallText: <span>Get loans designed to meet your specific personal needs.</span> },
    //     { name: 'Business', value: 'business', smallText: <span>Expand your business with our variety of business loans.</span> },
    // ];

    const [countries, setCountries] = useState([]);
    const getCountriesApi = useApi(userApis.getCountries);
    const [state, setState] = useState([]);
    const getStateApi = useApi(userApis.getState);
    const [bank, setBank] = useState([]);
    const getBankApi = useApi(userApis.getBank);
    
    const getCountries = async () => {
        const res = await getCountriesApi.request();
        if (res.ok) {
            setCountries(res.data);
        }
    }
    const getState = async () => {
        const res = await getStateApi.request();
        if (res.ok) {
            setState(res.data);
        }
    }
    const getBank = async () => {
        const res = await getBankApi.request();
        if (res.ok) {
            setBank(res.data);
        }
    }
    
    useEffect(() => {
        getCountries();
        getState();
        getBank()
    }, []);

    const [message, setMessage] = useState();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const res = await loanApplicationApi.request({ ...loanApplication, monthySalaryOrTurnover: parseInt(loanApplication.monthySalaryOrTurnover), isBusinessRegistered: Boolean(loanApplication.isBusinessRegistered), residenceStateId: parseInt(loanApplication.residenceStateId), residenceCountryId: parseInt(loanApplication.residenceCountryId), userId: newData.userId, loanTypeId: parseInt(loanType), loanAmount: parseInt(loanAmount), deviceId: result.visitorId, requestChannel: "web" });
        if (res.status === 200) {
            window.localStorage.setItem("loanSearchId", JSON.stringify({loanSearchId: res.data.data.id, PageNumber: 1, PageSize: 5}));
            setMessage(res.data.message);
            setShow(true);
        }
        if (res.data.code === 400 || res.data.code === 500) {
            const message = <Alert key="danger" variant="danger" style={{ fontSize: "16px" }}> {res.data.message} </Alert>;
            setMessage(message);
        }
        // console.log({ ...loanApplication, userId: newData.userId, loanTypeId: search.items[loanId].loanTypeId, lenderId: search.items[loanId].lenderId, requestChannel: "web", brokerCode: "None"});
    }

    return (
        <div>
            <section className={styles.section1}>
                <div className="container mt-5">
                    <div className="row col-md-8 m-auto" hidden={activeTab !== "first"}>
                        <Link to="/" className="text-center"><img src={logo} alt="" className={styles.logo} /></Link>
                        <h3 align="center" className={styles.title}>Business loan</h3>
                        <h4 align="center" className={styles.subTitle}>Fill all required fields</h4>
                        {message}
                        <Form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className="row">
                                {/* <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Loan Amount  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <NumericFormat thousandSeparator={true} thousandsGroupStyle="thousand" prefix={currency} allowNegative={false} onValueChange={(values) => {
                                        const { formattedValue, value, floatValue } = values;
                                        const newAmount = value;
                                        setLoanApplication({ ...loanApplication, loanAmount: newAmount })
                                        // do something with floatValue
                                    }} className={styles.contactInput} required placeholder={`${currency} 0.00`} />
                                </div> */}
                                {/* <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Loan Purpose  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, loanPurpose: e.target.value })} placeholder=""></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Loan Tenor (Maximum of 18 months)    <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="number" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, loanTenor: e.target.value })} range="" placeholder=""></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Payback Frequency  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, paybackFrequency: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Fortnightly">Fortnightly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Termly">Termly</option>
                                    </Form.Select>
                                </div> */}
                                {/*<div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required value={`${newData.firstName} ${newData.lastName}`} onChange={(e) => setLoanApplication({ ...loanApplication, name: e.target.value })} placeholder="Soji Timothy"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Phone Number  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required value={`${newData.phoneNumber}`} onChange={(e) => setLoanApplication({ ...loanApplication, phone: e.target.value })} placeholder="090XXXXXXXX"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Date Of Birth <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="date" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, dob: e.target.value })} placeholder="₦10,000,000.00"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Gender  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, gender: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </div> */}
                                <div className="col-md-4">
                            
                                    <Form.Label className={styles.contactLabel}>Monthly Salary / Turnover <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <NumericFormat thousandSeparator={true} thousandsGroupStyle="thousand" prefix={`${currency} `} allowNegative={false} onValueChange={(values) => {
                                        const { formattedValue, value, floatValue } = values;
                                        const newAmount = value;
                                        setLoanApplication({ ...loanApplication, monthySalaryOrTurnover: newAmount })
                                        // do something with floatValue
                                    }} className={styles.contactInput} required placeholder={`${currency} 500,000,000`} />
                                    {/* <Form.Control type="number" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, monthlySalaryOrTurnover: e.target.value })} placeholder="₦2,000,000.00"></Form.Control> */}
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Employer / Business Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, employerOrBusinessName: e.target.value })} placeholder="Enter here"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Business Registered?  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, isBusinessRegistered: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Select>
                                </div>
                                {/* <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Business Registration Number  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, businessRegNumber: e.target.value })} placeholder="Enter here"></Form.Control>
                                </div> */}
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Bank Account  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, bankCode: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        {bank.map(list => <option value={list.code}>{list.name}</option>)}
                                    </Form.Select>
                                </div>
                                {/* <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Account Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, accountName: e.target.value })} placeholder="***********"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Account Number  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, accountNumber: e.target.value })} placeholder="***********"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Employer / Business City  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, employerOrBusinessCity: e.target.value })} placeholder="Yaba"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Employer / Business State  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, employerOrBusinessStateId: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        {state.map(item => <option value={item.id}>{item.name}</option>)}
                                    </Form.Select>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>Employer / Business Country  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, employerOrBusinessCountryId: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        {countries.map(item => <option value={item.id}>{item.name}</option>)}
                                    </Form.Select>
                                </div> */}
                                {/* <div className="col-md-8">
                                    <Form.Label className={styles.contactLabel}>Email Address  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="email" className={styles.contactInput} required value={`${newData.emailAddress}`} onChange={(e) => setLoanApplication({ ...loanApplication, emailAddress: e.target.value })} placeholder="Type your email address"></Form.Control>
                                </div> */}
                                {/* <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>BVN  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, bvn: e.target.value })} placeholder="Type your bvn number"></Form.Control>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label className={styles.contactLabel}>TAX ID  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, taxID: e.target.value })} placeholder="Type your Tax Id"></Form.Control>
                                </div> */}
                                <div className="col-md-8">
                                    <Form.Label className={styles.contactLabel}>Residence Address  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, residenceAddress: e.target.value })} placeholder="No 2 herbert macaulay way"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Address Landmark  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, addressLandmark: e.target.value })} placeholder="Landmark"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Residence City  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, residenceCity: e.target.value })} placeholder="Yaba"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>State of Residence  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, residenceStateId: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        {state.map(item => <option value={item.id}>{item.name}</option>)}
                                    </Form.Select>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Country  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Select className={styles.contactInput} required onChange={(e) => setLoanApplication({ ...loanApplication, residenceCountryId: e.target.value })}>
                                        <option selected disabled>Select</option>
                                        {countries.map(item => <option value={item.id}>{item.name}</option>)}
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
                        <p>{message}</p>
                        <Link to="/search-result" className={styles.apply}> Proceed </Link>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LoanRequestPage;