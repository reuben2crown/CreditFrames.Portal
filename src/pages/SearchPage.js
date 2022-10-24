import React, { useEffect, useState } from "react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import styles from "../styles/SearchPage.module.css";
import { FaArrowLeft, FaArrowRight, FaStar} from "react-icons/fa";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import routes from "../routes";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import { NumericFormat } from "react-number-format";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import jwtDecode from "jwt-decode";
import { Form, Modal } from "react-bootstrap";


const SearchPage = () => {

    document.title = "Search Page - Creditframes";

    const location = useLocation();
    const navigate = useNavigate
    
    const [show, setShow] = useState();
    const [userValid, setUserValid] = useState();
    
    const [searchEmpty, setSearchEmpty] = useState();
    //console.log('pathname', location.pathname);
    //console.log(!location.search ? "No Data" : "Yes Data");

    // console.log(location.pathname + location.search);

    const [searchParams, setSearchParams] = useSearchParams();

    const authenticate = () => {
        if (localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined) {
            navigate(routes.LoginPage);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);


    const [loanSearch, setLoanSearch] = useState();

    const [currency, setCurrency] = useState("NGN");

    const [searchLoan, setSearchLoan] = useState();
    const searchLoanApi = useApi(userApis.searchLoan);
    const searchResultApi = useApi(userApis.searchResult);

    useEffect (() => {
        if (localStorage.getItem("countrySelected") !== null && localStorage.getItem("countrySelected") !== undefined) {
            const currency = JSON.parse(localStorage.getItem("countrySelected"));
            setCurrency(currency.currencyCode);
        }

        if (localStorage.getItem("loanSearchId")) {
            const searchData = JSON.parse(localStorage.getItem("loanSearchId"));

            const input = {
                PageNumber: searchData.PageNumber,
                PageSize: searchData.PageSize,
                LoanSearchId: searchData.loanSearchId
            }
            const getLoanSearch = async () => {
                const res = await searchResultApi.request(input);
                if (res.status === 200) {
                    setLoanSearch(res.data);
                }
            }
            getLoanSearch();
        }

        // if (localStorage.getItem("searchResult") !== null && localStorage.getItem("searchResult") !== undefined) {
        //     const loanSearch = JSON.parse(localStorage.getItem("searchResult"));
        //     setLoanSearch(loanSearch);
        // }
    }, []);

    const getLoanTypesApi = useApi(userApis.getLoanTypes);
    const [loanTypes, setloanTypes] = useState([]);

    useEffect(() => {
        const getLoanTypes = async () => {
            const res = await getLoanTypesApi.request();
            if (res.status === 200) {
                setloanTypes(res.data);
            }
        }
        getLoanTypes();
    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (localStorage.getItem("userData") !== null && localStorage.getItem("userData") !== undefined) {
            return navigate(`/./loan-request?loanType=${searchLoan.LoanTypeId}&loanAmount=${searchLoan.LoanAmount}`);

            // We recommend to call `load` at application startup.
            // const fp = await FingerprintJS.load();

            // // The FingerprintJS agent is ready.
            // // Get a visitor identifier when you'd like to.
            // const result = await fp.get();

            // // This is the visitor identifier:
            // //console.log(result.visitorId);

            // const user = JSON.parse(localStorage.getItem("userData"));
            //  const decodedData = jwtDecode(user.accessToken);
            //  const newData = JSON.parse(decodedData.UserData);
            //  setUserValid(newData.userId);

            // const country = JSON.parse(localStorage.getItem("countrySelected"));

            // const res = await searchLoanApi.request({ ...searchLoan, UserId: userValid, DeviceId: result.visitorId, CountryId: country.id });
            // if (res.status === 200) {
            //     const input = {
            //         LoanAmount: searchLoan.LoanAmount,
            //         PageNumber: searchLoan.PageNumber,
            //         PageSize: searchLoan.PageSize,
            //         LoanTypeId: searchLoan.LoanTypeId,
            //         DeviceId: result.visitorId,
            //         CountryId: country.id
            //     }
            //     window.localStorage.setItem("searchLoan", JSON.stringify(input));
            //     setShow(false);
            //     navigate(routes.SearchPage);
            // //  if (location.pathname === "/search-result") {
            // //      window.location.reload(false);
            // //  }
            // }
        }
        if (localStorage.getItem("userData") === null) {
            return navigate(`/./login-register?returnUrl=/loan-request?loanType%3D${searchLoan.LoanTypeId}%26loanAmount%3D${searchLoan.LoanAmount}`);

            //console.log(searchLoan);
            // We recommend to call `load` at application startup.
            // const fp = await FingerprintJS.load();

            // // The FingerprintJS agent is ready.
            // // Get a visitor identifier when you'd like to.
            // const result = await fp.get();

            // // This is the visitor identifier:
            // //console.log(result.visitorId);

            //  const country = JSON.parse(localStorage.getItem("countrySelected"));
            // // console.log(userValid, country);
            //  const res = await searchLoanApi.request({ ...searchLoan, DeviceId: result.visitorId, CountryId: country.id });
            // if (res.status === 200) {
            //     const input = {
            //         LoanAmount: searchLoan.LoanAmount,
            //         PageNumber: searchLoan.PageNumber,
            //         PageSize: searchLoan.PageSize,
            //         LoanTypeId: searchLoan.LoanTypeId,
            //         DeviceId: result.visitorId,
            //         CountryId: country.id
            //     }
            //     window.localStorage.setItem("searchLoan", JSON.stringify(input));
            //     setShow(false);
            //     navigate(routes.SearchPage);
            // //  if (location.pathname === "/search-result") {
            // //      window.location.reload(false);
            // //  }
            // }
        }

    };


    const handleNextPage = async() => {

        const searchData = JSON.parse(localStorage.getItem("loanSearchId"));
        const input = {
            PageNumber: searchData.PageNumber + 1,
            PageSize: searchData.PageSize,
            LoanSearchId: searchData.loanSearchId
        }

        const res = await searchResultApi.request(input);
        if (res.status === 200){
            window.localStorage.setItem("loanSearchId", JSON.stringify(input));
            setLoanSearch(res.data);
            // window.location.reload(false);
        }

    }

    const handlePreviousPage = async() => {
        
        const searchData = JSON.parse(localStorage.getItem("loanSearchId"));

        const input = {
            PageNumber: searchData.PageNumber - 1,
            PageSize: searchData.PageSize,
            LoanSearchId: searchData.loanSearchId
        }

        console.log(input);

        const res = await searchResultApi.request(input);
        if (res.status === 200) {
            window.localStorage.setItem("loanSearchId", JSON.stringify(input));
            setLoanSearch(res.data);
        }
    }
    //Search -> Login/Signup (If not already log in) -> Application Form -> Lenders Result -> Apply -> Goto Lender Website-> End
    //note the ?returnUrl=/lenders/lender-form?loanType=4&loanAmount=2000
    //products.slice(0, 4).map(...);
    

    return (
        <div>
            <NavMenu />
            <section className={styles.section1}>
                <div className="container text-center pt-5 pb-5">
                    <h2 className={styles.title}>Loan Search results</h2>
                    <h4 className={styles.subTitle} > {loanSearch?.totalCount} Lenders available </h4>
                </div>
            </section>
            <section className={styles.section2}>
                <div className="container mt-5 mb-5 pb-5">
                    <div className={styles.searchBox}>
                        {loanSearch?.items?.length === 0 ? <div className="text-center"><h3>No record found</h3> <h4><Link to="" onClick={() => setShow(true)} style={{color: "#000", textDecoration: "none"}}><b>Please update your search options</b></Link></h4></div> : loanSearch?.items?.map((list, key) => <div className={styles.card} key={key}>
                            <div className="row">
                                <div className="col-md-4 text-start pb-3">
                                    <img src={list.lender.logo} width="200px" alt="" className={styles.searchImage} />
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Lenders Name</label>
                                    <span className={styles.searchSpan}>{list.lender.lenderName}</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Type</label>
                                    <span className={styles.searchSpan}>{list.loanTypeName}</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Interest Rate</label>
                                    <span className={styles.searchSpan}>{list.minimumInterestRate}% <br />{list.maximumInterestRate}%</span>
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Approval Time</label>
                                    <span className={styles.searchSpan}>{Math.floor(list.minTurnAroundTimeInMinute / 60)} Minutes <br />{Math.floor(list.maxTurnAroundTimeInMinute / 60)} Minutes</span>
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    {list.lender.apiActivated === true ? <Link to={`/loan-request?loanId=${key}`}><button className={styles.apply}>Apply</button></Link> : <a href={list.lender.website} target="Blank"><button className={styles.apply}>Apply</button></a>}
                                </div>
                                <div className="col-md-2 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Range</label>
                                    <span className={styles.searchSpan}>{currency} {list.minimumLoanAmount.toLocaleString()} <br/>{currency} {list.maximumLoanAmount.toLocaleString()}</span>
                                </div>
                                <div className="col-md-6 text-start pb-3">
                                    <label className={styles.searchLabel}>Rating</label>
                                    <span className={styles.searchSpan}>{list.lender.averageRating} Stars &nbsp;
                                    {[...Array(list.lender.averageRating)].map((num, key) => <FaStar className={styles.star} key={key} />)}</span>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <h4 className="m-5">
                    {loanSearch?.hasPreviousPage === true ? <button className={styles.apply} onClick={() => handlePreviousPage()}><FaArrowLeft /> See Previous</button> : ""}
                        {loanSearch?.hasNextPage === true ? <button className={styles.apply} onClick={() => handleNextPage()}>See More <FaArrowRight /></button> : ""}</h4>
                </div>
            </section>
            <Footer />
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered show={show}
                onHide={() => setShow(false)}>
                <Modal.Body>
                    <div className={styles.card1}>
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 text-start">
                                    <label>How much would you like to borrow?</label>
                                    {/* <Form.Control type="number" className={styles.select} onChange={(e) => setSearchLoan({ ...searchLoan, amount: e.target.value })} placeholder="Enter your preferred amount"></Form.Control> */}
                                    <NumericFormat thousandSeparator={true} thousandsGroupStyle="thousand" prefix={`${currency} `} allowNegative={false} onValueChange={(values) => {
                                        const { formattedValue, value, floatValue } = values;
                                        const newAmount = value;
                                        setSearchLoan({ ...searchLoan, LoanAmount: newAmount })
                                        // do something with floatValue
                                    }} className={styles.select} required placeholder={`${currency} 0.00`} />
                                </div>
                                <div className="col-md-6 text-start">
                                    <label>Types of Loan</label>
                                    <Form.Select className={styles.select} required onChange={(e) => setSearchLoan({ ...searchLoan, LoanTypeId: e.target.value })}>
                                        <option selected disabled>Select Loan Type</option>
                                        {loanTypes.map(loans => <option value={loans.id}>{loans.name}</option>)}
                                    </Form.Select>
                                </div>
                                <div className="col-md-10 m-auto pt-4"><button type="submit" className={styles.submit}>{searchLoanApi.loading ? "Searching..." : "Search for loan"}</button></div>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SearchPage;