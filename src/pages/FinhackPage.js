import React from "react"; 
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import styles from "../styles/FinhackPage.module.css";
import { FaRegComments, FaRegEye } from "react-icons/fa";
import news1 from "../images/newImage.png";
import news2 from "../images/news2.png";
import news3 from "../images/news3.png";
import news4 from "../images/news4.png";
import news5 from "../images/news5.png";
import news6 from "../images/news6.png";




const FinhackPage = () => {
    return (
        <div>
            <NavMenu />
            <section className={styles.section1}>
                <div className="container mt-5 text-center">
                    <div className="row col-md-6 m-auto">
                        <h4 className={styles.subtitle}>FINHACK</h4>
                        <h2 className={styles.title}>Checkout some stories & insight from us</h2>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mt-5 mb-4">
                    <div className="row">
                        <div className="col-md-6 mb-5">
                            <div className={styles.content1}>
                                <span>Published January 21, 2021</span>
                                <h3 className={styles.newsTitle}>How to identify loan scam and fruadster</h3>
                                <span className={styles.tags}><FaRegComments /> 23 &nbsp;&nbsp;&nbsp;&nbsp;<FaRegEye /> 350</span>
                            </div>
                            <img src={news1} className={styles.newBg} alt="" />
                        </div>
                        <div className="col-md-6 text-start row">
                            <div className="col-lg-6">
                                <img src={news2} alt="" align="right" className={styles.newsImage}></img>
                            </div>
                            <div className="col-lg-6">
                                <span className={styles.postDate}>Published January 21, 2021</span>
                                <h4 className={styles.postTitle}>My Money Mistake: My Friends Lost ₦3 Million Because Of Me</h4>
                                <span className={styles.postContent}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.......... </span>
                                <span className={styles.postTags}><FaRegComments /> 23 &nbsp;&nbsp;&nbsp;&nbsp;<FaRegEye /> 350</span>
                            </div>
                            <div className="col-lg-6">
                                <img src={news3} alt="" align="right" className={styles.newsImage}></img>
                            </div>
                            <div className="col-lg-6">
                                <span className={styles.postDate}>Published January 21, 2021</span>
                                <h4 className={styles.postTitle}>My Money Mistake: My Friends Lost ₦3 Million Because Of Me</h4>
                                <span className={styles.postContent}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.......... </span>
                                <span className={styles.postTags}><FaRegComments /> 23 &nbsp;&nbsp;&nbsp;&nbsp;<FaRegEye /> 350</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.sectionNews}>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-md-4 pb-5">
                            <img src={news4} className="mb-3" width="100%" alt="" />
                            <div style={{paddingRight: "20px"}}>
                                <span className={styles.postDate}>Published January 21, 2021</span>
                                <h4 className={styles.postTitle}>My Money Mistake: My Friends Lost ₦3 Million Because Of Me</h4>
                                <span className={styles.postContent}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.......... </span>
                                <span className={styles.postTags}><FaRegComments /> 23 &nbsp;&nbsp;&nbsp;&nbsp;<FaRegEye /> 350</span>
                            </div>
                        </div>
                        <div className="col-md-4 pb-5">
                            <img src={news5} className="mb-3" width="100%" alt="" />
                            <div style={{paddingRight: "20px"}}>
                                <span className={styles.postDate}>Published January 21, 2021</span>
                                <h4 className={styles.postTitle}>My Money Mistake: My Friends Lost ₦3 Million Because Of Me</h4>
                                <span className={styles.postContent}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.......... </span>
                                <span className={styles.postTags}><FaRegComments /> 23 &nbsp;&nbsp;&nbsp;&nbsp;<FaRegEye /> 350</span>
                            </div>
                        </div>
                        <div className="col-md-4 pb-5">
                            <img src={news6} className="mb-3" width="100%" alt="" />
                            <div style={{paddingRight: "20px"}}>
                                <span className={styles.postDate}>Published January 21, 2021</span>
                                <h4 className={styles.postTitle}>My Money Mistake: My Friends Lost ₦3 Million Because Of Me</h4>
                                <span className={styles.postContent}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.......... </span>
                                <span className={styles.postTags}><FaRegComments /> 23 &nbsp;&nbsp;&nbsp;&nbsp;<FaRegEye /> 350</span>
                            </div>
                        </div>
                        <div className="col-md-4 pb-5">
                            <img src={news4} className="mb-3" width="100%" alt="" />
                            <div style={{ paddingRight: "20px" }}>
                                <span className={styles.postDate}>Published January 21, 2021</span>
                                <h4 className={styles.postTitle}>My Money Mistake: My Friends Lost ₦3 Million Because Of Me</h4>
                                <span className={styles.postContent}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.......... </span>
                                <span className={styles.postTags}><FaRegComments /> 23 &nbsp;&nbsp;&nbsp;&nbsp;<FaRegEye /> 350</span>
                            </div>
                        </div>
                        <div className="col-md-4 pb-5">
                            <img src={news5} className="mb-3" width="100%" alt="" />
                            <div style={{ paddingRight: "20px" }}>
                                <span className={styles.postDate}>Published January 21, 2021</span>
                                <h4 className={styles.postTitle}>My Money Mistake: My Friends Lost ₦3 Million Because Of Me</h4>
                                <span className={styles.postContent}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.......... </span>
                                <span className={styles.postTags}><FaRegComments /> 23 &nbsp;&nbsp;&nbsp;&nbsp;<FaRegEye /> 350</span>
                            </div>
                        </div>
                        <div className="col-md-4 pb-5">
                            <img src={news6} className="mb-3" width="100%" alt="" />
                            <div style={{ paddingRight: "20px" }}>
                                <span className={styles.postDate}>Published January 21, 2021</span>
                                <h4 className={styles.postTitle}>My Money Mistake: My Friends Lost ₦3 Million Because Of Me</h4>
                                <span className={styles.postContent}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.......... </span>
                                <span className={styles.postTags}><FaRegComments /> 23 &nbsp;&nbsp;&nbsp;&nbsp;<FaRegEye /> 350</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center"><button className={styles.apply2}>Read more</button></div>
                </div>
                <div className={styles.ui}></div>
            </section>
            <Footer />
        </div>
    )
};

export default FinhackPage;