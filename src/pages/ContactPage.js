import React, { useState } from "react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import Form from "react-bootstrap/Form";
import Accordion from 'react-bootstrap/Accordion';
import styles from "../styles/ContactPage.module.css";
import telephone from "../images/telephone.png";
import envelope from "../images/envelope.png";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import Alert from "react-bootstrap/Alert";



const ContactPage = () => {

    document.title = "Contact Page - Creditframes";

    const userContactApi = useApi(userApis.contact);
    const [contact, setContact] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await userContactApi.request(contact);

        if (res.data.code === 200) {
            const message = <Alert key="success" variant="success" style={{ fontSize: "16px" }}> {res.data.message} </Alert>;
            setSuccessMessage(message);
        }
        if (res.data.code === 400) {
            const message = <Alert key="danger" variant="danger" style={{ fontSize: "16px" }}> {res.data.message} </Alert>;
            setErrorMessage(message);
        }
    }


    return (
        <div>
            <NavMenu />
            <section className={styles.section1}>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 text-start">
                            <h4 className={styles.subtitle}>CONTACT US</h4>
                            <h2 className={styles.title}>We're always available</h2>
                            <hr className={styles.titleLine} />
                            <div className={styles.contact1}>
                                <img src={envelope} alt="" />
                                <p>hello@creditframes.com <br /><span>Mon - Fri <br /> Sat & Sun</span><span>9am - 5pm <br />
                                    Closed</span></p>
                            </div>
                        </div>
                        <div className="col-md-6 m-auto">
                            <img src={telephone} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mt-5 pt-5">
                    <div className="row col-md-8 m-auto">
                        <h3 align="center" className={styles.secTitle}>Fill out this form, <br />we'll quickly get back to you</h3>
                        {errorMessage}{successMessage}
                        <Form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Label className={styles.contactLabel}>How can we help you?  <span style={{ color: "#A9358D"}}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setContact({ ...contact, subject: e.target.value })} placeholder="State your purpose of writing to us."></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>First Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setContact({ ...contact, firstName: e.target.value })} placeholder="Type your first name"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Last Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setContact({ ...contact, lastName: e.target.value })} placeholder="Type your last name"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Email Address  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="email" className={styles.contactInput} onChange={(e) => setContact({ ...contact, emailAddress: e.target.value })} placeholder="Type your email address"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Phone Number  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} onChange={(e) => setContact({ ...contact, phoneNumber: e.target.value })} placeholder="Type your phone number"></Form.Control>
                                </div>
                                <div className="col-md-12">
                                    <Form.Label className={styles.contactLabel}>Message  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control as="textarea" rows={5} placeholder="Type your message here" onChange={(e) => setContact({ ...contact, message: e.target.value })} className={styles.contactInput}></Form.Control>
                                    <button type="submit" className={styles.apply}> Send </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mt-5 pt-5 mb-5">
                    <div className="row col-md-10 m-auto">
                        <h3 align="center" className={styles.secTitle}>Frequently Asked Questions</h3>
                        <h5 align="center" className={styles.secSubTitle}>Please contact us if you cannot find an answer to your question.</h5>
                        <Accordion defaultActiveKey="0" flush className="mt-5 mb-5">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className={styles.accordionHeader}><b>Is CreditFrames a lending institution? </b></Accordion.Header>
                                <Accordion.Body className={styles.accordionBody}>
                                    No, we connect borrowers to lenders to provide options on a single platform for ease of comparison and making a healthier financial decision.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header className={styles.accordionHeader}><b>Does CreditFrames show the best low interest rate loans from different lenders?</b></Accordion.Header>
                                <Accordion.Body className={styles.accordionBody}>
                                    Yes, CreditFrames will provide personalized loan rates for customers through our purpose driven API across lending institutions.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ContactPage;