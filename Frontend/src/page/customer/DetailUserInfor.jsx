import React from 'react';
import Navbar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import DetailUser from "../../component/DetailUser.jsx"
function DetailUserInfor(props) {
    return (
        <div>
            <div className={' bg-gray-50'}>
                <div className={'mx-20'}>
                    <Navbar />
                    <DetailUser/>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default DetailUserInfor;