import React, { useState, useEffect } from "react";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/ProfilePage.module.css";
import { BsArrowLeft } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup"; 
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";
import userApis from "../../api/users";
import useApi from "../../hooks/useApi";
import jwtDecode from "jwt-decode";
import { Alert } from "react-bootstrap";


const ProfilePage = () => {

    document.title = "Account Profile Page - Creditframes";

    const navigate = useNavigate();

    const authenticate = () => {
        if (localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined) {
            navigate(routes.LoginPage);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);


    const [countries, setCountries] = useState([]);
    const getCountriesApi = useApi(userApis.getCountries);
    const [state, setState] = useState([]);
    const getStateApi = useApi(userApis.getState);
    const [userProfile, setUserProfile] = useState({});

    // const profileSettings = async () => {
    //     const user = JSON.parse(localStorage.getItem("userData"));
    //     const decodedData = jwtDecode(user.accessToken);
    //     const newData = JSON.parse(decodedData.UserData);
    //     setUserProfile(newData);
    // }

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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"));
        const decodedData = jwtDecode(user.accessToken);
        const newData = JSON.parse(decodedData.UserData);
        setUserProfile(newData);
        getCountries();
        getState();
    }, []);

    const [profile, setProfile] = useState();
    const [message, setMessage] = useState();
    const [phone, setPhone] = useState("");
    const updateProfileApi = useApi(userApis.updateProfile);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        console.log(profile.firstName, profile.lastName);
        if (profile.firstName === undefined && profile.lastName === undefined ) {
            console.log("Invalid FirstName and LastName");
        }
        const res = await updateProfileApi.request({...profile, userId: userProfile.userId});
        if (res.data.status === true) {
            const message = <Alert key="success" variant="success" style={{ fontSize: "16px" }}> {res.data.message} </Alert>;
            setMessage(message);
        }
        if (res.data.status === false) {
            const message = <Alert key="danger" variant="danger" style={{ fontSize: "16px" }}> {res.data.message} </Alert>;
            setMessage(message);
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
                            <h4 className={styles.pageTitle}><BsArrowLeft style={{ marginRight: "5px", verticalAlign: "top" }} /> Profile </h4>
                            {message}
                        </div>
                        <div className="row col-md-12 mt-4">
                            <div className={styles.cardTable1}>
                                <div className={styles.cardInside}>
                                    <span>Profile Settings</span>
                                </div>
                                <Form onSubmit={handleProfileUpdate} className={styles.contactForm}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>First Name  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} placeholder="Enter Firstname"></Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>Last Name  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} required onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} placeholder="Enter Lastname"></Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>Email Address  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="email" className={styles.contactInput} disabled required value={userProfile.emailAddress} onChange={(e) => setProfile({ ...profile, emailAddress: e.target.value })} placeholder="Email Address"></Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel} style={{position: "relative", zIndex: "9"}}>Phone Number  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            {/* <InputGroup style={{width: "100%"}}>
                                                <Form.Select className={styles.contactInput} style={{ width: "20%"}}>
                                                    <option>+234</option>
                                                    <option>+234</option>
                                                    <option>+234</option>
                                                </Form.Select>
                                                <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="8012345678" style={{ width: "80%" }}></Form.Control>
                                            </InputGroup> */}
                                            <Form.Control type="text" className={styles.contactInput} disabled required value={userProfile.phoneNumber} onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}></Form.Control>
                                            {/* <PhoneInput
                                                inputStyle={{width: "100%", marginTop: "-20px"}}
                                                country={"eg"}
                                                enableSearch={true} 
                                                required
                                                value={userProfile.phoneNumber}
                                                onChange={(phone) => setPhone(phone)}
                                            /> */}
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>Date of Birth  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="date" className={styles.contactInput} required onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })} placeholder="MM-DD-YYYY"></Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>Gender  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput} required onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                                                <option>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </Form.Select>
                                        </div>
                                        {/* <div className="col-md-12">
                                            <Form.Label className={styles.contactLabel}>Address  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="12 wasooro avenue, block C Abuja "></Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>State of Origin  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput}>
                                                <option>Select State</option>
                                                {state.map(items => <option value={items.id}>{items.name}</option>)}
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Label className={styles.contactLabel}>Country of Resident <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput}>
                                                <option>Select country</option>
                                                {countries.map(items => <option value={items.id}>{items.name}</option>)}
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Bank Name  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Zenith Bank "></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Account Number  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="2200776610"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Bank Verification Number  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="222444563711"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Employer Status  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput}>
                                                <option value="">Select option</option>
                                                <option value="Employed">Employed</option>
                                                <option value="Unemployed">Unemployed</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Employer Name <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Rasak Emma"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Employer Address  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Raji Street Lagos"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Annual Income <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="5000000"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Job Title  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Supervisor"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Marital Status  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput}>
                                                <option value="">Select option</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Dependants  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Control type="text" className={styles.contactInput} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Email"></Form.Control>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Label className={styles.contactLabel}>Number of Children  <span style={{ color: "#FF0000" }}>*</span></Form.Label>
                                            <Form.Select className={styles.contactInput}>
                                                <option value="">Select option</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                            </Form.Select>
                                        </div> */}
                                        <div className="col-md-12"><span style={{fontStyle: "italic", fontSize: "12px", marginLeft: "20px"}}>The above in asterisks are mandatory fields to help us provide personalised service to our customers</span></div>
                                        <button type="submit" className={styles.apply}>Save</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ProfilePage;