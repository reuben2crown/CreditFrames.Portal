import React from "react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import styles from "../styles/SearchPage.module.css";
import renmoney from "../images/renmoney.png";
import pettycash from "../images/pettycash.png";
import carbon from "../images/carbon.png";
import branch from "../images/Branch.png";
import { FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import jwtDecode from "jwt-decode";
import routes from "../routes";
import { Link } from "react-router-dom";


const SearchPage = () => {

    const country = JSON.parse(localStorage.getItem("searchResult"));

    // const user = JSON.parse(localStorage.getItem("userData"));
    // const decodedData = jwtDecode(user.accessToken);
    // const newData = JSON.parse(decodedData.UserData);
    // console.log(newData.userId);
    
    const result = {
        "items": [
            {
                "id": 0,
                "createdDate": "2022-09-22T01:46:48.028Z",
                "lenderName": "string",
                "description": "string",
                "emailAddress": "string",
                "phoneNumber": "string",
                "logo": "string",
                "website": "string",
                "countryId": 0,
                "stateId": 0,
                "address": "string",
                "city": "string",
                "hasWebApp": true,
                "hasMobileApp": true,
                "minimumLoanAmount": 0,
                "maximumLoanAmount": 0,
                "turnAroundTimeInMinute": 0,
                "eligiblityCriteria": "string",
                "facebookUrl": "string",
                "twitterUrl": "string",
                "instagramUrl": "string",
                "linkedinUrl": "string",
                "rank": 5,
                "score": 0,
                "loanTypes": [
                    {
                        "id": 0,
                        "createdDate": "2022-09-22T01:46:48.028Z",
                        "lenderId": 0,
                        "loanTypeId": 0,
                        "loanTypeName": "string",
                        "minimumLoanAmount": 0,
                        "maximumLoanAmount": 0,
                        "returnCustomerAmount": 0,
                        "averageLoanTenor": 0,
                        "averageInterestRate": 0,
                        "repaymentTimeFrame": 0,
                        "moratoriumPeriod": 0,
                        "turnAroundTimeInMinute": 0,
                        "requirements": "string",
                        "security": "None",
                        "createdBy": "string",
                        "score": 0
                    }
                ],
                "features": [
                    {
                        "id": 0,
                        "featureId": 0,
                        "featureName": "string",
                        "isSelected": true
                    }
                ],
                "isActive": true,
                "apiActivated": true
            },
            {
                "id": 2,
                "createdDate": "2022-09-22T01:46:48.028Z",
                "lenderName": "string",
                "description": "string",
                "emailAddress": "string",
                "phoneNumber": "string",
                "logo": "string",
                "website": "string",
                "countryId": 0,
                "stateId": 0,
                "address": "string",
                "city": "string",
                "hasWebApp": true,
                "hasMobileApp": true,
                "minimumLoanAmount": 0,
                "maximumLoanAmount": 0,
                "turnAroundTimeInMinute": 0,
                "eligiblityCriteria": "string",
                "facebookUrl": "string",
                "twitterUrl": "string",
                "instagramUrl": "string",
                "linkedinUrl": "string",
                "rank": 3,
                "score": 0,
                "loanTypes": [
                    {
                        "id": 0,
                        "createdDate": "2022-09-22T01:46:48.028Z",
                        "lenderId": 0,
                        "loanTypeId": 0,
                        "loanTypeName": "string",
                        "minimumLoanAmount": 0,
                        "maximumLoanAmount": 0,
                        "returnCustomerAmount": 0,
                        "averageLoanTenor": 0,
                        "averageInterestRate": 0,
                        "repaymentTimeFrame": 0,
                        "moratoriumPeriod": 0,
                        "turnAroundTimeInMinute": 0,
                        "requirements": "string",
                        "security": "None",
                        "createdBy": "string",
                        "score": 0
                    }
                ],
                "features": [
                    {
                        "id": 0,
                        "featureId": 0,
                        "featureName": "string",
                        "isSelected": true
                    }
                ],
                "isActive": true,
                "apiActivated": true
            }
        ],
        "pageNumber": 0,
        "totalPages": 0,
        "totalCount": 0,
        "hasPreviousPage": true,
        "hasNextPage": true
    };

    console.log(result);


    return (
        <div>
            <NavMenu />
            <section className={styles.section1}>
                <div className="container text-center pt-5 pb-5">
                    <h2 className={styles.title}>Loan Search results</h2>
                    <h4 className={styles.subTitle} >{result.totalCount} Lenders available </h4>
                </div>
            </section>
            <section className={styles.section2}>
                <div className="container mt-5 mb-5 pb-5">
                    <div className={styles.searchBox}>
                        {result.items.map((list, key) => <div className={styles.card} key={key}>
                            <div className="row">
                                <div className="col-md-4 text-start pb-3">
                                    <img src={list.logo} alt="" className={styles.searchImage} />
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Lenders Name</label>
                                    <span className={styles.searchSpan}>{list.lenderName}</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Type</label>
                                    <span className={styles.searchSpan}>{list.loanTypes[0].loanTypeName}</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Interest Rate</label>
                                    <span className={styles.searchSpan}>{list.loanTypes[0].averageInterestRate}</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Approval Time</label>
                                    <span className={styles.searchSpan}>{list.loanTypes[0].moratoriumPeriod}</span>
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <Link to="/loan-request"><button className={styles.apply}>Apply</button></Link>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Range</label>
                                    <span className={styles.searchSpan}>₦{list.loanTypes[0].minimumLoanAmount} ₦{list.loanTypes[0].maximumLoanAmount}</span>
                                </div>
                                <div className="col-md-6 text-start pb-3">
                                    <label className={styles.searchLabel}>Rating</label>
                                    <span className={styles.searchSpan}>{list.rank} Stars &nbsp;
                                    {[...Array(list.rank)].map((num, key) => <FaStar className={styles.star} key={key} />)}</span>
                                </div>
                            </div>
                        </div>
                        )}
                        {/* <div className={styles.card}>
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
                        </div> */}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default SearchPage;