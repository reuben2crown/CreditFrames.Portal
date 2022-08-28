import React from "react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import styles from "../styles/SearchPage.module.css";
import renmoney from "../images/renmoney.png";
import pettycash from "../images/pettycash.png";
import carbon from "../images/carbon.png";
import branch from "../images/Branch.png";
import { FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";



const SearchPage = () => {
    return (
        <div>
            <NavMenu />
            <section className={styles.section1}>
                <div className="container text-center pt-5 pb-5">
                    <h2 className={styles.title}>Loan Search results</h2>
                    <h4 className={styles.subTitle} >3 Lenders available </h4>
                </div>
            </section>
            <section className={styles.section2}>
                <div className="container mt-5 mb-5 pb-5">
                    <div className={styles.searchBox}>
                        <div className={styles.card}>
                            <div className="row">
                                <div className="col-md-4 text-start pb-3">
                                    <img src={branch} alt="" className={styles.searchImage} />
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Lenders Name</label>
                                    <span className={styles.searchSpan}>Branch Loan</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Type</label>
                                    <span className={styles.searchSpan}>Personal</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Interest Rate</label>
                                    <span className={styles.searchSpan}>5% - 6.5%</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Approval Time</label>
                                    <span className={styles.searchSpan}>2hrs</span>
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <button className={styles.apply}>Apply</button>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Range</label>
                                    <span className={styles.searchSpan}>₦10,000,000 ₦20,000,000</span>
                                </div>
                                <div className="col-md-6 text-start pb-3">
                                    <label className={styles.searchLabel}>Rating</label>
                                    <span className={styles.searchSpan}>5 Stars &nbsp;<FaStar className={styles.star} /><FaStar className={styles.star} /><FaStar className={styles.star} /><FaStar className={styles.star} /><FaStar className={styles.star} /></span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className="row">
                                <div className="col-md-4 text-start pb-3">
                                    <img src={carbon} alt="" className={styles.searchImage} />
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Lenders Name</label>
                                    <span className={styles.searchSpan}>Branch Loan</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Type</label>
                                    <span className={styles.searchSpan}>Personal</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Interest Rate</label>
                                    <span className={styles.searchSpan}>5% - 6.5%</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Approval Time</label>
                                    <span className={styles.searchSpan}>2hrs</span>
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <button className={styles.apply}>Apply</button>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Range</label>
                                    <span className={styles.searchSpan}>₦10,000,000 ₦20,000,000</span>
                                </div>
                                <div className="col-md-6 text-start pb-3">
                                    <label className={styles.searchLabel}>Rating</label>
                                    <span className={styles.searchSpan}>5 Stars &nbsp;<FaStar className={styles.star} /><FaStar className={styles.star} /><FaStar className={styles.star} /><FaStar className={styles.star} /><FaStar className={styles.star} /></span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className="row">
                                <div className="col-md-4 text-start pb-3">
                                    <img src={pettycash} alt="" className={styles.searchImage} />
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Lenders Name</label>
                                    <span className={styles.searchSpan}>Branch Loan</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Type</label>
                                    <span className={styles.searchSpan}>Personal</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Interest Rate</label>
                                    <span className={styles.searchSpan}>5% - 6.5%</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Approval Time</label>
                                    <span className={styles.searchSpan}>2hrs</span>
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <button className={styles.apply}>Apply</button>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Range</label>
                                    <span className={styles.searchSpan}>₦10,000,000 ₦20,000,000</span>
                                </div>
                                <div className="col-md-6 text-start pb-3">
                                    <label className={styles.searchLabel}>Rating</label>
                                    <span className={styles.searchSpan}>5 Stars &nbsp;<FaStar className={styles.star} /><FaStar className={styles.star} /><FaStar className={styles.star} /><FaStar className={styles.star} /><FaStar className={styles.star} /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default SearchPage;