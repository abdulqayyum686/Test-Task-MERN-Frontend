import React, { useState } from "react";
import "./header.css";
import logo from "../../assets/images/logo.png";
import send from "../../assets/images/send.png";
import logout from "../../assets/images/logout.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GrClose } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import calnder from "../../assets/images/calnder.png";
import setting from "../../assets/images/setting.png";

const Header = () => {
  const [active, setActive] = useState(1);
  const [show, setShow] = useState(false);
  const [acountToogle, setAccountToggle] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pathname = window.location.pathname;

  return (
    <>
      <div className="header_boundry">
        <div className="header_wraper">
          <div>
            <img src={logo} />
          </div>
          <div className="mobile_nav_icon" onClick={handleShow}>
            <RxHamburgerMenu />
          </div>
          <div className="header_right_side">
            <div className="header_content_box">
              <Link className="navi_lins" to="/home">
                <div
                  className={
                    pathname === "/home"
                      ? "header_items_active"
                      : "header_items"
                  }
                >
                  Home
                </div>
              </Link>
              <Link className="navi_lins" to="/billing-history">
                <div
                  className={
                    pathname === "/billing-history"
                      ? "header_items_active"
                      : "header_items"
                  }
                >
                  {" "}
                  Billing History
                </div>
              </Link>
              <Link className="navi_lins" to="/booking">
                <div
                  className={
                    pathname === "/booking"
                      ? "header_items_active"
                      : "header_items"
                  }
                >
                  Booking
                </div>
              </Link>
              <Link className="navi_lins" to="/payment-history">
                <div
                  className={
                    pathname === "/payment-history"
                      ? "header_items_active"
                      : "header_items"
                  }
                >
                  {" "}
                  Payment History
                </div>
              </Link>
            </div>
            <div className="header_acount_box">
              <div>
                <img src={send} />
              </div>
              <div
                className="acoount_name"
                onClick={() => setAccountToggle(!acountToogle)}
              >
                RD
                {acountToogle && (
                  <div className="account_toogle">
                        <Link
                        className="navi_lins"
                        to="/prodile"
                        // state={data}
                      >
                      <div className="acount_togle_items">
                        <div>
                          <img src={profile} />
                        </div>
                        Profile
                      </div>
                    </Link>
                    <div className="acount_togle_items">
                      <div>
                        <img src={calnder} />
                      </div>
                      Calender
                    </div>
                    <div className="acount_togle_items">
                      <div>
                        <img src={setting} />
                      </div>
                      Settings
                    </div>
                    <div className="toogle_sep"></div>
                    <div className="logut_items">
                      <div>
                        <img src={logout} />
                      </div>
                      Log Out
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <div className="mobile_header">
          <div>
            <img src={logo} />
          </div>
          <div onClick={handleClose}>
            <GrClose className="close_icon" />
          </div>
        </div>
        <div className="mobile_content_body">
          <div className="mobile_items_box">
            <Link className="navi_lins" to="/home">
              <div className="mobile_items">Home</div>
            </Link>
            <Link className="navi_lins" to="/billing-history">
              <div className="mobile_items">Billing History</div>
            </Link>
            <Link className="navi_lins" to="/booking">
              <div className="mobile_items">Booking</div>
            </Link>
            <Link className="navi_lins" to="/payment-history">
              <div className="mobile_items">Payment History</div>
            </Link>
          </div>
          <div className="mobile_acount_box">
            <div>
              <img src={send} />
            </div>
            <div className="acoount_name">RD</div>
          </div>
        </div>
      </Offcanvas>
    </>
  );
};

export default Header;
