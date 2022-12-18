import React, { useEffect, useState } from "react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import styles from "../styles/SearchPage.module.css";
import { FaArrowLeft, FaArrowRight, FaStar} from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import routes from "../routes";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import { Modal, Spinner } from "react-bootstrap";
import loaderLogo from "../images/CreditFrame logo.png";
import SearchModal from "../components/SearchModal";


const SearchPage = () => {

    document.title = "Search Page - Creditframes";

    const navigate = useNavigate

    const [loader, setLoader] = useState(false);
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [searchParams] = useSearchParams();
    const LoanSearchId = searchParams.get("LoanSearchId");
    const PageNumber = searchParams.get("PageNumber");
    const PageSize = searchParams.get("PageSize");


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

    const searchResultApi = useApi(userApis.searchResult);

    useEffect (() => {
        if (localStorage.getItem("countrySelected") !== null && localStorage.getItem("countrySelected") !== undefined) {
            const currency = JSON.parse(localStorage.getItem("countrySelected"));
            setCurrency(currency.currencyCode);
        }

        if (LoanSearchId !== null && LoanSearchId !== undefined) {
            const input = {
                PageNumber: PageNumber,
                PageSize: PageSize,
                LoanSearchId: LoanSearchId
            }
            
            const getLoanSearch = async () => {
                setLoader(true);
                const res = await searchResultApi.request(input);
                if (res.status === 200) {
                    setLoanSearch(res.data);
                    // navigate(`/./search-result?LoanSearchId=${loanSearchId}&PageNumber=${loanSearch.PageNumber}}&PageSize=${loanSearch.PageSize}`);
                }
                setLoader(false);
            }
            getLoanSearch();
        }
    }, []);

    const getLoanTypesApi = useApi(userApis.getLoanTypes);

    useEffect(() => {
        const getLoanTypes = async () => {
            setLoader(true);
            const res = await getLoanTypesApi.request();
            if (res.status === 200) {
                setLoader(false);
            }
        }
        getLoanTypes();
    }, []);


    const handleNextPage = async() => {
        setLoader(true);
        const input = {
            PageNumber: PageNumber + 1,
            PageSize: PageSize,
            LoanSearchId: LoanSearchId
        }

        const res = await searchResultApi.request(input);
        if (res.status === 200){
            //window.localStorage.setItem("loanSearchId", JSON.stringify(input));
            setLoanSearch(res.data);
            navigate(`/./search-result?LoanSearchId=${LoanSearchId}&PageNumber=${loanSearch.PageNumber}}&PageSize=${loanSearch.PageSize}`)
            // window.location.reload(false);
        }
        setLoader(false);

    }

    const handlePreviousPage = async() => {
        setLoader(true);
        const input = {
            PageNumber: PageNumber - 1,
            PageSize: PageSize,
            LoanSearchId: LoanSearchId
        }

        const res = await searchResultApi.request(input);
        if (res.status === 200) {
            setLoader(false);
            //window.localStorage.setItem("loanSearchId", JSON.stringify(input));
            setLoanSearch(res.data);
            navigate(`/./search-result?LoanSearchId=${LoanSearchId}&PageNumber=${loanSearch.PageNumber}}&PageSize=${loanSearch.PageSize}`)
        }
    }    

    return (
        <div>
            <SearchModal show={show} handleClose={handleClose} handleShow={handleShow} />
            <Modal size="sm" show={loader} centered>
                <Modal.Body className="text-center">
                    <Spinner animation="border" style={{ color: "#0000FB", width: "60px", height: "60px", position: "absolute" }} />
                    <img src={loaderLogo} width="30px" height="30px" alt="" style={{ margin: "15px" }} />
                </Modal.Body>
            </Modal>
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
                                <div className="col-md-4 text-start pb-3">
                                    <label className={styles.searchLabel}>Lenders Name</label>
                                    <span className={styles.searchSpan}>{list.lender.lenderName}</span>
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Type</label>
                                    <span className={styles.searchSpan}>{list.loanTypeName}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 text-start pb-3">
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <label className={styles.searchLabel}>Approval Time</label>
                                    <span className={styles.searchSpan}>{Math.floor(list.minTurnAroundTimeInMinute / 60)} Min - {Math.floor(list.maxTurnAroundTimeInMinute / 60)} Min</span>
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <label className={styles.searchLabel}>Loan Range</label>
                                    <span className={styles.searchSpan}>{currency} {list.minimumLoanAmount.toLocaleString()} - {currency} {list.maximumLoanAmount.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 text-start pb-3">
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <label className={styles.searchLabel}>Interest Rate</label>
                                    <span className={styles.searchSpan}>{list.minimumInterestRate}% - {list.maximumInterestRate}%</span>
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <label className={styles.searchLabel}>Rating</label>
                                    <span className={styles.searchSpan}>{list.lender.averageRating} Stars &nbsp;&nbsp;
                                        {[...Array(list.lender.averageRating)].map((num, key) => <FaStar className={styles.star} key={key} />)}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 text-start pb-3">
                                    {list.lender.apiActivated === true ? <Link to={`/loan-request?loanId=${key}`}><button className={styles.apply}>Apply</button></Link> : <a href={list.lender.website} target="Blank"><button className={styles.apply}>Apply</button></a>}
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <label className={styles.searchLabel}>Requirements</label>
                                    <span className={styles.searchSpan}>{list.requirements === null ? "None" : <>
                                        {list.requirements.replaceAll(',', ', ')}</>}</span>
                                </div>
                                <div className="col-md-4 text-start pb-3">
                                    <label className={styles.searchLabel}>Eligibility Criteria</label>
                                    <span className={styles.searchSpan}>{list.eligiblityCriteria === null ? "None" : list.eligiblityCriteria} </span>
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
        </div>
    )
}

export default SearchPage;