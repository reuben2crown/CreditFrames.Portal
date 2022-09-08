import React from "react";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/ProfilePage.module.css";
import { BsArrowLeft } from "react-icons/bs";


const ProfilePage = () => {

    return (
        <div>
            <NavMenu />
            <section className={styles.dashboardbg}> 
                <div className="row m-0">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className={styles.pageContent}>
                            <h4 className={styles.pageTitle}><BsArrowLeft style={{ marginRight: "5px", verticalAlign: "top" }} /> Profile </h4>
                        </div>
                        <div className="row col-md-12 mt-4">
                            <div className={styles.cardTable1}>
                                <div className={styles.cardInside}>
                                    <span>Profile Settings</span>
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

export default ProfilePage;