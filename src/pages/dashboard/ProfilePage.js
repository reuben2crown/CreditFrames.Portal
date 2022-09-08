import React from "react";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/DashboardPage.module.css";


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
                        <h1>tfg7yuh8jniknm drtfgvy bnuibjh n4d6rgvbjh n</h1>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ProfilePage;