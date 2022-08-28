import React from "react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import Form from "react-bootstrap/Form";
import Accordion from 'react-bootstrap/Accordion';
import styles from "../styles/ContactPage.module.css";
import telephone from "../images/telephone.png";
import envelope from "../images/envelope.png";



const ContactPage = () => {
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
                        <Form className={styles.contactForm}>
                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Label className={styles.contactLabel}>How can we help you?  <span style={{ color: "#A9358D"}}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} placeholder="State your purpose of writing to us."></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>First Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} placeholder="Type your first name"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Last Name  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} placeholder="Type your last name"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Email Address  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="email" className={styles.contactInput} placeholder="Type your email address"></Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <Form.Label className={styles.contactLabel}>Phone Number  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control type="text" className={styles.contactInput} placeholder="Type your phone number"></Form.Control>
                                </div>
                                <div className="col-md-12">
                                    <Form.Label className={styles.contactLabel}>Message  <span style={{ color: "#A9358D" }}>*</span></Form.Label>
                                    <Form.Control as="textarea" rows={5} className={styles.contactInput}>Type your message here</Form.Control>
                                    <button className={styles.apply}> Send </button>
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
                                <Accordion.Header className={styles.accordionHeader}><b>Is CreditFrames a lending institution?</b></Accordion.Header>
                                <Accordion.Body className={styles.accordionBody}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header className={styles.accordionHeader}><b>When is CreditFrames live?</b></Accordion.Header>
                                <Accordion.Body className={styles.accordionBody}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header className={styles.accordionHeader}><b>Does CreditFrames shows the best low interest rate loans from diffrent users?</b></Accordion.Header>
                                <Accordion.Body className={styles.accordionBody}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
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