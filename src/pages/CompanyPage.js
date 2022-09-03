import React from "react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import styles from "../styles/CompanyPage.module.css";
import companybg from "../images/companybg.png";
import leftui from "../images/leftui.png";
import productImage from "../images/productImage.png";
import test1 from "../images/testi1.png";
import test2 from "../images/testi2.png";
import Carousel from "better-react-carousel";



const CompanyPage = () => {

    return (
        <div>
            <NavMenu />
            <section className={styles.section1}>
                <div className="container mt-2 mb-2 text-center">
                    <div className="row col-md-8 m-auto">
                        <h4 className={styles.subtitle}>OUR COMPANY</h4>
                        <h2 className={styles.title}>We are your one stop Personlised Loan Marketplace Hub</h2>
                    </div>
                    <img src={companybg} className={styles.companyImage} alt="" />
                </div>
            </section>
            <section className={styles.section2}>
                <div className="container mt-3 mb-5">
                    <div className="row col-md-9 m-auto px-4 text-center">
                        <hr className={styles.titleLine} />
                        <h3 className={styles.secTitle}>About Us</h3>
                        <p>Creditframes is Africa’s number 1 loan marketplace. We are building the continents smart credit infrastructure, starting with a fit for purpose loan marketplace where we match borrowers with the right lenders (vice versa) offering the best interest rates. This would enable borrowers make a well-informed borrowing decision.</p>
                        <p>We leverage on Artificial Intelligence (AI), tailored data analytics and machine learning to understand customers needs and present the best lenders based on their needs.</p>
                    </div>
                </div>
                <div className="container mt-5 mb-5">
                    <div className="row col-md-9 m-auto text-center">
                        <p><b>Vision</b><br />
                            Our vision is to build a more financial Inclusive Africa by creating a Trustworthy, Enabling, Collaborative and Secure (TECS) environment for businesses and individuals to reach their financial goals
                        </p>
                        <p><b> Mission</b><br />
                            We are on a mission to build a more financial inclusive Africa for everyone
                        </p>
                        <p><b> Our Values</b><br />
                            Our core values make the backbone of our decision making, how our teams are built, and customer and partners engagements</p>
                    </div>
                </div>
                <div className="text-end"><img src={leftui} style={{ marginBottom: "-200px" }} alt="" /></div>
                <div className="container mb-5">
                    <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-5 text-center">
                            <div className={styles.card}>
                                <h4>INTEGRITY</h4>
                                <p>Acting with strong ethics is a priority for everyone representing CreditFrames as well as the company's behaviour as a whole. </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-5 text-center">
                            <div className={styles.card}>
                                <h4>CUSTOMER OBSESSION</h4>
                                <p>Every decision we make always starts with our customers and then work backwards </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-5 text-center">
                            <div className={styles.card}>
                                <h4>TRUST</h4>
                                <p>We will always work in a transparent and trustworthy manner that earns respect of our customers, business partners, colleagues, and the public </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-5 text-center">
                            <div className={styles.card}>
                                <h4>DIVERSITY AND INCLUSION</h4>
                                <p>Our zero tolerance for discrimination is boldly embedded in our day-to-day activities as an organisation and as individuals. We embrace different lived experiences and a range of backgrounds into our shared environment where everyone has equal opportunity. </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-5 text-center">
                            <div className={styles.card}>
                                <h4>OWNERSHIP</h4>
                                <p>We are proactive in solving problems and always have all hands-on deck as an organisation </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-5 text-center">
                            <div className={styles.card}>
                                <h4>CAN DO ATTITUDE</h4>
                                <p>Nothing is beyond us; we will make sure we have exhausted all possible options and left no stone unturned to satisfy our customers </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.section5}>
                <div className="container">
                    <div className="row col-md-11 m-auto text-center">
                        <h4 className={styles.subTitle}>TESTIONIALS</h4>
                        <h2 className={styles.secTitle}>What Customers say</h2>
                        <div className="mt-4">
                            <Carousel cols={2} rows={1} gap={20} loop={true} autoplay={3000}>
                                <Carousel.Item>
                                    <img src={test1} alt="" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={test2} alt="" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={test1} alt="" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={test2} alt="" />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mt-5 mb-5 pt-5 pb-5">
                    <div className={styles.box}>
                        <div className="row">
                            <div className="col-md-6 m-auto">
                                <h3 className={styles.secTitle1}>Get access to the best loan offers with ease</h3>
                                <button className={styles.apply}>Apply Here</button>
                            </div>
                            <div className="col-md-6 m-0 p-0 text-end">
                                <img src={productImage} className={styles.productImage} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default CompanyPage;