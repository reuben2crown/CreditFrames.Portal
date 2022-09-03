import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Carousel from "better-react-carousel";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import styles from "../styles/LandingPage.module.css";
import { FaArrowRight, FaRegComments, FaRegEye } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import lady from "../images/hmbg1.png";
import circle1 from "../images/Ellipse1.png";
import circle2 from "../images/Ellipse2.png";
import renmoney from "../images/renmoney.jpg";
import pettycash from "../images/pettycash.jpg";
import carbon from "../images/carbon.jpg";
import branch from "../images/branch.jpg";
import businessIcon from "../images/business.png";
import personalIcon from "../images/personal.png";
import illustration1 from "../images/illustration1.png";
import icon1 from "../images/icon1.png";
import icon2 from "../images/icon2.png";
import icon3 from "../images/icon3.png";
import icon4 from "../images/fi-rr-compress-altIcons.svg";
import icon5 from "../images/fi-rr-diplomaIcons.svg";
import icon6 from "../images/fi-rr-thumbs-upIcons.svg";
import icon7 from "../images/fi-rr-e-learningIcons.svg";
import illustration2 from "../images/illustration2.png";
import leftUI from "../images/left-ui.png";
import test1 from "../images/test1.png";
import test2 from "../images/test2.png";
import test3 from "../images/test3.png";
import news1 from "../images/newImage.png";
import news2 from "../images/news2.png";
import news3 from "../images/news3.png";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import routes from "../routes";



const LandingPage = () => {

    const navigate = useNavigate();

    const [searchLoan, setSearchLoan] = useState();
    const searchLoanApi = useApi(userApis.searchLoan);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchLoan);
        const res = await searchLoanApi.request(searchLoan);
        if (res.ok) {
            //navigate(routes.SearchPage);
        }
    }

    const handleClick = () => {
        navigate(routes.LoanRequestPage);
    }
    
    return (
        <div>
            <NavMenu />
            <section className={styles.homebg1}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 text-center m-auto">
                            <h2 className={styles.title}>Africa's No 1. Personalised Loan Marketplace.</h2> 
                            <h4 className={styles.subtitle}>Search, Compare, and Apply</h4>
                            <div className={styles.card}>
                                <Form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 text-start">
                                            <label>How much would you like to borrow?</label>
                                            <Form.Control type="number" className={styles.select} onChange={(e) => setSearchLoan({ ...searchLoan, amount: e.target.value })} placeholder="Enter your preferred amount"></Form.Control>
                                        </div>
                                        <div className="col-md-6 text-start">
                                            <label>Types of Loan</label>
                                            <Form.Select className={styles.select} onChange={(e) => setSearchLoan({...searchLoan, loanType: e.target.value})}>
                                                <option selected disabled>Select Loan Type</option>
                                                <option value="1">Business Loan</option>
                                                <option value="2">Personal Loan</option>
                                            </Form.Select> 
                                        </div>
                                        <div className="col-md-10 m-auto pt-4"><button type="submit" className={styles.submit}>Search for loan</button></div>
                                    </div>
                                </Form>
                            </div>
                            <h4 className={styles.subtitle}>Unlocking new financial levels</h4>
                        </div>
                        <div className="col-md-5 text-end">
                            <img src={circle1} className={styles.circle1} alt="" />
                            <img src={lady} alt="" className={styles.lady} />
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.section2}>
                <div className="container text-end">
                    <img src={circle2} className={circle2} alt="" />
                </div>
            </section>
            <section className={styles.section3}>
                <div className="container text-center pt-4 pb-4">
                    <div className={styles.carousel}>
                        <Carousel cols={4} rows={1} gap={10} loop={true} autoplay={3000}>
                            <Carousel.Item>
                                <img src={renmoney} className={styles.carousel1} alt="" />
                            </Carousel.Item>
                            <Carousel.Item>                                
                                <img src={pettycash} className={styles.carousel1} alt="" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={carbon} className={styles.carousel1} alt="" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={branch} className={styles.carousel1} alt="" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={renmoney} className={styles.carousel1} alt="" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={pettycash} className={styles.carousel1} alt="" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={carbon} className={styles.carousel1} alt="" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={branch} className={styles.carousel1} alt="" />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
                
            </section>
            <section className={styles.section4}>
                <div className="container px-4">
                    <div className="row col-md-5 m-auto text-center">
                        <h2 className={styles.secTitle}>Explore loans</h2>
                        <h4 className={styles.secSubTitle}>We work with credible lenders to meet your business and personal financial needs</h4>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6 text-center">
                            <div className={styles.card1}>
                                <img src={businessIcon} alt="" />
                                <h3>Business Loan</h3>
                                <p>Are you looking to grow or start a business? Explore your loan options here</p>
                                <button onClick={handleClick} className={styles.apply1}>APPLY NOW</button>
                            </div>
                        </div>
                        <div className="col-md-6 text-center">
                            <div className={styles.card1}>
                                <img src={personalIcon} alt="" />
                                <h3>Personal Loan</h3>
                                <p>We are here to give you the best loan rates for your personal needs. Explore your loan options here</p>
                                <button onClick={handleClick} className={styles.apply1}>APPLY NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.section5}>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-md-5 text-start" style={{padding: "0px 50px 20px 50px"}}>
                            <hr className={styles.titleLine}></hr> 
                            <p className={styles.subTitle}>WHO WE ARE</p>
                            <h3 className={styles.secTitle}>We are your one stop Personlised Loan Marketplace Hub</h3>
                            <p className={styles.secSubTitle} style={{marginTop: "20px"}}>CreditFrames is building Africa's No 1 Credit marketplace, by connecting borrowers with lenders that suit their needs. We will present customers with the lenders that provide the cheapest interest rate via ranking...</p>
                            <p><Link to="contact-us" className={styles.link}> Learn more </Link><FaArrowRight className={styles.arrow} /></p>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-6 text-center">
                            <img src={illustration1} className={styles.illustration1} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.section6}>
                <div className="container mt-5 mb-5">
                    <div className="row col-md-5 pt-5 m-auto text-center">
                        <h2 className={styles.secTitle}>How it works</h2>
                        <h4 className={styles.secSubTitle}>Simplified 3 steps process</h4>
                    </div>
                    <div className="row pt-3 mt-5">
                        <div className="col-md-4 text-center">
                            <div className={styles.box1}>
                                <img src={icon1} alt="" />
                                <h4 className={styles.iconTitle} style={{verticalAlign: "bottom"}}>Fill in the loan <br></br> application</h4>
                                <p>Provide basic information for your loan and get customised loan options</p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className={styles.box1}>
                                <img src={icon2} alt="" />
                                <h4 className={styles.iconTitle}>Compare</h4>
                                <p>Compare offers from different lenders based on what is important to you</p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className={styles.box1}>
                                <img src={icon3} alt="" />
                                <h4 className={styles.iconTitle}>Apply</h4>
                                <p>Once you have chosen a lender, you can now apply</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.section7}>
                <div className="container mt-100 mb-5">
                    <div className="row col-md-5 pt-5 m-auto text-center">
                        <h2 className={styles.secTitle}>Why CreditFrames?</h2>
                        <h4 className={styles.secSubTitle}>Focused on creating an enabling environment for borrowers and lenders </h4>
                    </div>
                    <div className="row pt-2 mt-5">
                        <div className="col-md-3 text-center">
                            <div className={styles.iconCard}>
                                <img src={icon4} alt="" />
                                <h4>Tailored to <br />your needs</h4>
                                <p>We will match you with a lender that is likely to borrow you based on your needs</p>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className={styles.iconCard1}>
                                <img src={icon5} alt="" />
                                <h4>Work with trust <br />license lenders</h4>
                                <p>All lenders on our platform are thoroughly vetted</p>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className={styles.iconCard}>
                                <img src={icon6} alt="" />
                                <h4>Best deals <br />guranteed</h4>
                                <p>We will present you with lenders with the best deals according to your needs</p>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className={styles.iconCard1}>
                                <img src={icon7} alt="" />
                                <h4>Financial <br />Literacy</h4>
                                <p>Promoting borrowing literacy through our educational FinHack guide</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.middleSec}></section>
            <section className={styles.section8}>
                <img src={leftUI} alt="" className={styles.rightFloating} />
                <div className="container mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <img src={illustration2} className={styles.illustration2} alt="" />
                        </div>
                        <div className="col-md-5 m-auto text-start">
                            <div className={styles.content}>
                                <hr className={styles.titleLine}></hr>
                                <h3 className={styles.secTitle}>Getting you access to the best loan offers.</h3>
                                <button onClick={handleClick} className={styles.apply2}>Apply Here</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.section8}>
                <div className="container mb-5 mt-5">
                    <div className="row col-md-5 pt-5 m-auto text-center">
                        <h2 className={styles.secTitle}>What Customers say</h2>
                        <h4 className={styles.secSubTitle}>Customer feedback is key to our business growth. </h4>
                    </div>
                    <Carousel cols={1} rows={1} gap={10} loop={true} autoplay={3000}>
                        <Carousel.Item>
                            <div className="row content pt-5">
                                <div className="col-md-6 text-center">
                                    <img src={test1} height="400px" alt="" />
                                </div>
                                <div className="col-md-5 m-auto text-start" style={{ padding: "0px 50px 0px 50px" }}>
                                    <p className={styles.subTitle}>TESTIMONIALS</p>
                                    <h3 className={styles.secTitle}>Ibrahim Joel</h3>
                                    <p>With CreditFrames, I was able to locate the right and suitable loan for my business, this has helped my business to move from a starter to a professional stage within few month.</p>
                                    <p>I will keep using and refering the brand. <br />Thank you CreditFrames </p>
                                    <button className={styles.apply2}>See more</button>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="row content pt-5">
                                <div className="col-md-6 text-center">
                                    <img src={test2} height="400px" alt="" />
                                </div>
                                <div className="col-md-5 m-auto text-start" style={{ padding: "0px 50px 0px 50px" }}>
                                    <p className={styles.subTitle}>TESTIMONIALS</p>
                                    <h3 className={styles.secTitle}>Christian White</h3>
                                    <p>With CreditFrames, I was able to locate the right and suitable loan for my business, this has helped my business to move from a starter to a professional stage within few month.</p>
                                    <p>I will keep using and refering the brand. <br />Thank you CreditFrames </p>
                                    <button className={styles.apply2}>See more</button>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="row content pt-5">
                                <div className="col-md-6 text-center">
                                    <img src={test3} height="400px" alt="" />
                                </div>
                                <div className="col-md-5 m-auto text-start" style={{ padding: "0px 50px 0px 50px" }}>
                                    <p className={styles.subTitle}>TESTIMONIALS</p>
                                    <h3 className={styles.secTitle}>Mark John</h3>
                                    <p>With CreditFrames, I was able to locate the right and suitable loan for my business, this has helped my business to move from a starter to a professional stage within few month.</p>
                                    <p>I will keep using and refering the brand. <br />Thank you CreditFrames </p>
                                    <button className={styles.apply2}>See more</button>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </section>
            <section className={styles.section9}>
                <div className="container">
                    <div className="row col-md-5">
                        <hr className={styles.titleLine1}/>
                        <h4 className={styles.subTitle}>FINHACK</h4>
                        <h3 className={styles.secTitle}><b>Checkout some stories & insight from Us </b></h3>
                    </div>
                </div>
            </section>
            <section>
                <div className="container" style={{marginTop: "-100px"}}>
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
                            
                            <div className={styles.content2}>
                                
                            </div>
                        </div>
                    </div>
                    <div className="text-center"><button className={styles.apply2}>Read more</button></div>
                </div>
            </section>
            <section>
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-10 text-center pt-5 m-auto">
                            <h3 className={styles.title}> Be the first to hear from us</h3>
                            <h5 className={styles.subtitle}> Subscribe to our Newsletter</h5>
                            <Form className={styles.subForm}>
                                <Form.Control type="email" className={styles.subInput} placeholder="email address"></Form.Control>
                                <button type="submit" className={styles.subSubmit}>Subscribe</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </section> 
            <Footer />
        </div>
    )
}

export default LandingPage;