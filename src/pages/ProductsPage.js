import React, { useState, useEffect } from "react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import styles from "../styles/ProductPage.module.css";
import worldMap from "../images/worldmap.png";
import businessIcon from "../images/business.png";
import personalIcon from "../images/personal.png";
import leftui from "../images/leftui.png";
import productImage from "../images/productImage.png";
import routes from "../routes";
import useApi from "../hooks/useApi";
import userApis from "../api/users";
import { NumericFormat } from "react-number-format";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";



const ProductsPage = () => {

    const [show, setShow] = useState();
    const navigate = useNavigate();

    const [userValid, setUserValid] = useState();
    const getLoanTypesApi = useApi(userApis.getLoanTypes);
    const [loanTypes, setloanTypes] = useState([]);
    const [currency, setCurrency] = useState();

    useEffect(() => {
        if (localStorage.getItem("countrySelected") !== null && localStorage.getItem("countrySelected") !== undefined) {
            const currency = JSON.parse(localStorage.getItem("countrySelected"));
            setCurrency(currency.currencyCode);
        };
    }, []);

    useEffect(() => {
        const getLoanTypes = async () => {
            const res = await getLoanTypesApi.request();
            if (res.status === 200) {
                setloanTypes(res.data);
            }
        }
        getLoanTypes();
    }, []);


    const [searchLoan, setSearchLoan] = useState();
    const searchLoanApi = useApi(userApis.searchLoan);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(searchLoan);
        // We recommend to call `load` at application startup.
        const fp = await FingerprintJS.load();

        // The FingerprintJS agent is ready.
        // Get a visitor identifier when you'd like to.
        const result = await fp.get();

        // This is the visitor identifier:
        //console.log(result.visitorId);

        const user = JSON.parse(localStorage.getItem("userData"));
        const decodedData = jwtDecode(user.accessToken);
        const newData = JSON.parse(decodedData.UserData);
        setUserValid(newData.userId);

        const country = JSON.parse(localStorage.getItem("countrySelected"));
        console.log(userValid, country);
        const res = await searchLoanApi.request({ ...searchLoan, UserId: userValid, DeviceId: result.visitorId, CountryId: country.id });
        if (res.ok) {
            window.localStorage.setItem("searchResult", JSON.stringify(res.data.data));
            navigate(routes.SearchPage);
        }
    };

    return (
        <div>
            <NavMenu />
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered show={show}
                onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <h4 align="center">Search For Loans</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.card}>
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 text-start">
                                    <label>How much would you like to borrow?</label>
                                    {/* <Form.Control type="number" className={styles.select} onChange={(e) => setSearchLoan({ ...searchLoan, amount: e.target.value })} placeholder="Enter your preferred amount"></Form.Control> */}
                                    <NumericFormat thousandSeparator={true} thousandsGroupStyle="thousand" prefix={currency} allowNegative={false} onValueChange={(values) => {
                                        const { formattedValue, value, floatValue } = values;
                                        const newAmount = value;
                                        setSearchLoan({ ...searchLoan, LoanAmount: newAmount })
                                        // do something with floatValue
                                    }} className={styles.select} required placeholder={`${currency} 500,000,000`} />
                                </div>
                                <div className="col-md-6 text-start">
                                    <label>Types of Loan</label>
                                    <Form.Select className={styles.select} required onChange={(e) => setSearchLoan({ ...searchLoan, LoanTypeId: e.target.value })}>
                                        <option selected disabled>Select Loan Type</option>
                                        {loanTypes.map(loans => <option value={loans.id}>{loans.name}</option>)}
                                    </Form.Select>
                                </div>
                                <div className="col-md-10 m-auto pt-4"><button type="submit" className={styles.submit}>Search for loan</button></div>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            <section className={styles.section1}>
                <div className="container mt-2 mb-2 text-center">
                    <div className="row col-md-5 mb-5 m-auto">
                        <h4 className={styles.subtitle}>OUR PRODUCTS</h4>
                        <h2 className={styles.title}>Getting you access to the best loan offers</h2>
                    </div>
                    <img src={worldMap} className={styles.worldMap} alt="" />
                </div>
            </section>
            <section>
                <div className="container mt-5 mb-5">
                    <div className="row col-md-7 m-auto px-4 text-center">
                        <hr className={styles.titleLine} />
                        <h3 className={styles.secTitle}>We offer the best loan <br />options that suit your needs</h3>
                        <p>Sourcing for the right lender to borrow from has always been a challenge.
                            CreditFrames has made it easier for you to work with the right lender.
                            Whether it is business or personal loans, Creditframes got you covered with our
                            AI tailored data driven match mechanism with the right lender for you.</p>
                    </div>
                </div>
            </section>
            <section style={{margin: "-100px 0px -50px 0px"}}> <img src={leftui} alt="" /></section>
            <section className={styles.section3}>
                <div className="container mt-5 mb-5">
                    <div className="row col-md-7 m-auto px-4 text-center">
                        <img src={personalIcon} className={styles.loanIcon} alt="" />
                        <h3 className={styles.secTitle}>Personal Loan</h3>
                        <p>Sometimes you find yourself in a difficult financial situation and in need of urgent 10k, say less, CreditFrames will provide you with options of trusted lenders we are working with to provide you with your needs.Don't forget, we still recommend you to the lenders offering the lowest interest rates.</p>
                    </div>
                </div>
            </section>
            <section className={styles.section4}>
                <div className="container mt-5 mb-5">
                    <div className="row col-md-7 m-auto px-4 text-center">
                        <img src={businessIcon} className={styles.loanIcon} alt="" />
                        <h3 className={styles.secTitle}>Business Loan</h3>
                        <p>Sometimes you find yourself in a difficult financial situation and in need of urgent 10k, say less, CreditFrames will provide you with options of trusted lenders we are working with to provide you with your needs.Don't forget, we still recommend you to the lenders offering the lowest interest rates.</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mt-5 mb-5 pt-5 pb-5">
                    <div className={styles.box}>
                        <div className="row">
                            <div className="col-md-6 m-auto">
                                <h3 className={styles.secTitle1}>Get access to the best loan offers with ease</h3>
                                <button onClick={() => setShow(true)} className={styles.apply}>Apply Here</button>
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

export default ProductsPage;