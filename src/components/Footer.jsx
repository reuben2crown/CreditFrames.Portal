import React from "react";
import logoWhite from "../images/logoWhite.png";
import styles from "../styles/Footer.module.css";
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";


const Footer = () => {

    return (
        <div><a
                href="https://wa.me/2348100000000"
                className={styles.whatsappFloat}
                target="_blank"
                rel="noopener noreferrer"
        >Chat with us &nbsp;&nbsp;&nbsp;
            <FaWhatsapp className={styles.whatsappIcon} />
            </a>
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
                            <p>Home</p>
                            <p>Services</p>
                            <p>How it works</p>
                        </div>
                        <div className="col-md-2 pt-5"> 
                            <h4>Company </h4>
                            <p>About</p>
                            <p>Contact</p>
                            <p>Blog</p>
                        </div>
                        <div className="col-md-2 pt-5"> 
                            <h4>Social </h4>
                            <p><FaInstagram style={{color: "#fff", fontSize: "24px"}} /> &nbsp; Instagram</p>
                            <p><FaFacebook style={{color: "#fff", fontSize: "24px"}} /> &nbsp; Facebook</p>
                            <p><FaTwitter style={{color: "#fff", fontSize: "24px"}} /> &nbsp; Twitter</p>
                            <p><FaLinkedinIn style={{ color: "#fff", fontSize: "24px" }} /> &nbsp; Linkedin</p>
                        </div>
                        <div className="col-md-2 pt-5"> 
                            <h4>Legal</h4>
                            <p>Privacy Policy</p>
                            <p>Terms & Condition</p>
                            <p>FAQ</p>
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
