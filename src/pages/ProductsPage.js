import React from "react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import styles from "../styles/ProductPage.module.css";
import worldMap from "../images/worldmap.png";
import businessIcon from "../images/business.png";
import personalIcon from "../images/personal.png";
import leftui from "../images/leftui.png";
import productImage from "../images/productImage.png";



const ProductsPage = () => {

    return (
        <div>
            <NavMenu />
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

export default ProductsPage;