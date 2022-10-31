import React from "react";
import logoWhite from "../images/logoWhite.png";
import styles from "../styles/Footer.module.css";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {

    return (
        <div>
            <section className={styles.Footer}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={logoWhite} alt="" className="mb-3" />
                            <p className={styles.FooterText}>A Pan-African digital platform designed to help businesses and individuals fund their aspirational needs</p>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-2 pt-5"> 
                            <h4>Quick Link </h4>
                            <p><Link className={styles.links} to="/">Home</Link></p>
                            <p><Link className={styles.links} to="/products">Product & Services</Link></p>
                        </div>
                        <div className="col-md-2 pt-5"> 
                            <h4>Company </h4>
                            <p><Link className={styles.links} to="/company">About</Link></p>
                            <p><Link className={styles.links} to="/contact-us">Contact Us</Link></p>
                        </div>
                        <div className="col-md-2 pt-5"> 
                            <h4>Social </h4>
                            <p><Link className={styles.links} to="https://www.instagram.com/creditframes_africa/"><FaInstagram style={{color: "#fff", fontSize: "24px"}} /> &nbsp; Instagram</Link></p>
                            <p><Link className={styles.links} to="https://web.facebook.com/CreditFramesAfrica"><FaFacebook style={{color: "#fff", fontSize: "24px"}} /> &nbsp; Facebook</Link></p>
                            <p><Link className={styles.links} to="https://twitter.com/creditframes/"><FaTwitter style={{color: "#fff", fontSize: "24px"}} /> &nbsp; Twitter</Link></p>
                            {/* <p><Link className={styles.links} to="#"><FaLinkedinIn style={{ color: "#fff", fontSize: "24px" }} /> &nbsp; Linkedin</Link></p> */}
                        </div>
                        <div className="col-md-2 pt-5"> 
                            <h4>Legal</h4>
                            <p><Link className={styles.links} to="#">Privacy Policy</Link></p>
                            <p><Link className={styles.links} to="#">Terms & Condition</Link></p>
                            <p><Link className={styles.links} to="#">FAQ</Link></p>
                        </div>
                    </div>
                    <div style={{ color: "#BABABA" }}><hr></hr></div>
                    <div><p className={styles.copyright}>Copyright © CreditFrames. 2022 All Rights Reserved</p></div>
                </div>
            </section>
        </div>
    );

}

export default Footer;
