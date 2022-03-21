import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Navbar,
  Nav,
  Container,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

import { logoutAsync } from "../auth/redux/authApi";
import Forgot from "../auth/pages/Forgot";
import Login from "../auth/pages/Login";

import logo from "./../../assets/images/logo.svg";
import wallet from "./../../assets/images/wallet.svg";
import metaMask from "./../../assets/images/metaMask.png";
import notification from "./../../assets/images/notification.svg";
import userImg from "./../../assets/images/userImg.svg";
import {
  getBellNotificationListAsync,
  getNotificationListAsync,
  getLinkRedirection,
} from "../Notification/redux/notificationApi";
import { ReactTimeAgoC } from "../../components/utils/ReactTimeAgoC";
import { Web3Context } from "../../web3/contexts/web3Context";
import socket from "../../components/Socket/Socket";
import { AuthMap } from "../auth/redux/authAction";
import GitInfo from "react-git-info/macro";

const Header = () => {
  const { handleConnect } = useContext(Web3Context)
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.authToken && auth.user,
      user: auth.user,
    }),
    shallowEqual
  );
  
  const logout = () => {
    history.push("/");
  };

  const { isAutoLogout } = useSelector((state) => state.auth, shallowEqual);

  const { isLoading, bellNotificationList } = useSelector(
    (state) => state.notification,
    shallowEqual
  );
  
  const state = useSelector((state) => state);
  const profilePicture =
    state.auth.user !== null &&
    state.auth.user !== {} &&
    state.auth.user !== undefined
      ? state.auth.user.profilePicture
      : userImg;

  // const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const gitInfo = GitInfo();
    //console.log('GitInfo', gitInfo);
    // window.addEventListener("scroll", () => {
    //   setScroll(window.scrollY > 50);
    // });
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const location = useLocation();
  const collapse = useRef();
  const [navExpanded, setNavExpanded] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [dropShow, setDropShow] = useState(false);

  const handleClickOutside = (e) => {
    if (collapse && collapse.current) {
      const ref = collapse.current;
      if (!ref.contains(e.target)) {
        setNavExpanded(false);
      }
    }
  };
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const [showForgot, setShowForgot] = useState(false);
  const handleCloseForgot = () => setShowForgot(false);
  const handleShowForgot = () => {
    setShowLogin(false);
    setShowForgot(true);
  };

  //Notifications start

  useEffect(() => {
    if (isAuthorized !== null && isAuthorized !== undefined) {
      handleConnect();
      let socketConnection = socket.connect();
      socketConnection.on("connect", function () {
        socket.emit("setSocketId", {
          id: user._id,
          socketId: socketConnection.id,
        });
      });
      
      // socket.on("newUserNotification", (data) => {
      //   console.log({ dropShow });
      //   if (dropShow) {
      //     dispatch(getBellNotificationListAsync());
      //   }
      
      //   if (location.pathname == "/notification") {
      //     dispatch(getNotificationListAsync());
      //   } else {
      //     setNotification(true);
      //   }
      // });
        
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err}`);
      });
      
      //dispatch(getBellNotificationListAsync());
      //dispatch(getNotificationListAsync());
      if (isAuthorized.isNotification === true) {
        setNotification(true);
      }
    }
    
    return () => {
      socket.off("newUserNotification");
      socket.disconnect("newUserNotification");
      socket.off("getAllMessages");
      socket.disconnect("getAllMessages");

      socket.off("setSocketId");
      socket.disconnect("setSocketId");
    };
  }, [isAuthorized]);

  useEffect(() => {
    if (dropShow) {
      setNotification(false);
    }
  }, [isNotification]);

  const redirectToAccount = () => {
    // history.push(`/profile?tab=${step}`);
    history.push("/profile?tab=8");
  };

  useEffect(() => {
    if (dropShow) {
      dispatch(getBellNotificationListAsync());
    }

    socket.on("newUserNotification", (data) => {
      if (dropShow) {
        dispatch(getBellNotificationListAsync());
      }

      if (location.pathname == "/notification") {
        dispatch(getNotificationListAsync());
      } else {
        setNotification(true);
      }
    });

    return () => {
      socket.off("newUserNotification");
      //socket.disconnect("newUserNotification");
    };
  }, [dropShow]);
  //Notifications end
  
  //Logout if user deactive/deleted by admin
  // useEffect(() => {
  //   if (isAutoLogout) {
  //     dispatch(logoutAsync());
  //   }
  // }, [isAutoLogout]);
  //Logout if user deactive/deleted by admin

  return (
    <>
      <header className={`fixed-top bg-white`}>
        <Navbar bg="transparent" expand="xl" expanded={navExpanded}>
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src={logo} width="150px" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav" ref={collapse}>
              <Nav className="mr-auto" onSelect={(e) => setNavExpanded(false)}>
                <Nav.Link
                  as={Link}
                  to="/explore"
                  className={
                    location.pathname === "/explore" ||
                    location.pathname === "/"
                      ? "active"
                      : ""
                  }
                >
                  Explore
                </Nav.Link>

                {user === {} || user === null ? (
                  <>
                    {/* <Nav.Link
                      as={Link}
                      to="/aboutus"
                      className={
                        location.pathname === "/aboutus" ? "active" : ""
                      }
                    >
                      About Us
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/features"
                      className={
                        location.pathname === "/features" ? "active" : ""
                      }
                    >
                      Features
                    </Nav.Link> */}
                    {/* <Nav.Link
                      as={Link}
                      to="/roadmap"
                      className={
                        location.pathname === "/roadmap" ? "active" : ""
                      }
                    >
                      RoadmapHead
                    </Nav.Link> */}
                    {/* <Nav.Link
                      as={Link}
                      to="/team"
                      className={location.pathname === "/team" ? "active" : ""}
                    >
                      Team
                    </Nav.Link> */}
                  </>
                ) : (
                  <Nav.Link
                    as={Link}
                    to="/chat"
                    className={location.pathname === "/chat" ? "active" : ""}
                  >
                    Messages
                  </Nav.Link>
                )}

                {/* <Nav.Link
                  as={Link}
                  to="/faq"
                  className={location.pathname === "/faq" ? "active" : ""}
                >
                  FAQ
                </Nav.Link> */}
                <a
                  // as={Link}
                  href="https://t.me/rebaked"
                  target="_blank"
                  rel="noreferrer"
                  // to="https://t.me/rebaked"
                  className="nav-link"
                >
                  Contact Us
                </a>
              </Nav>
              {!isAuthorized && (
                <Nav className="re_navRightSide flex-wrap">
                  <Link
                    to="/register"
                    className="btn btn-blue sign btn-sm px-4 mr-3"
                  >
                    Sign up
                  </Link>
                  <button
                    type="button"
                    onClick={handleShowLogin}
                    className="btn btn-outline-black btn-sm px-4"
                  >
                    Log in
                  </button>
                  <Login
                    showLogin={showLogin}
                    handleCloseLogin={handleCloseLogin}
                    link={true}
                    handleShowForgot={handleShowForgot}
                  />
                  <Forgot
                    showForgot={showForgot}
                    handleCloseForgot={handleCloseForgot}
                  />
                </Nav>
              )}
            </Navbar.Collapse>
            <div className="d-flex align-items-center">
              <Nav className="re_navRightSide">
                {isAuthorized && (
                  <>
                    <DropdownButton
                      menuAlign="right"
                      title={
                        <>
                          <span className="text-capitalize userName_width">
                            {user?.fullName}
                          </span>
                          <div
                            className="userImgHDR"
                            style={{
                              backgroundImage: `url(${profilePicture})`,
                            }}
                          >
                            {/* <img src={profilePicture} alt="user" /> */}
                          </div>
                        </>
                      }
                      id="re_UserDropDown"
                    >
                    <Dropdown.Item as={Link} to="/dashboard">
                        Dashboard
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/expensesdashBoardinitiator">
                        Initiator Payment Dashboard
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/paymentdashboardcollaborator">
                        Collaborator Payment Dashboard
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/profile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/settings">
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="3"
                        onClick={() => dispatch(logoutAsync(logout))}
                      >
                        Logout
                      </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                      menuAlign="right"
                      title={<img src={notification} alt="notification" />}
                      id="re_notification"
                      className={isNotification ? "activeNoti" : ""}
                      onToggle={(nextShow) => setDropShow(nextShow)}
                      onClick={() => {
                        if (user.isNotification) {
                          dispatch({
                            type: AuthMap.UPDATE_NOTIFICATION_STATUS,
                            payload: false,
                          });
                        }
                        setNotification(false);
                      }}
                    >
                      {isLoading ? (
                        <div className="text-center p3 color_gray ">
                          Loading...
                        </div>
                      ) : bellNotificationList.records &&
                        bellNotificationList.records.length > 0 ? (
                        bellNotificationList.records.map((notification) => {
                          const redirectionLink =
                            getLinkRedirection(notification);
                          if (notification.categoryType === "CARD_COMMENT") {
                            return (
                              <Dropdown.Item
                                // as={Link}
                                href={redirectionLink}
                                // onClick={() => history.push(`${redirectionLink}`)}
                                className={`text-normal ${
                                  !notification.isRead && "unreadNotification"
                                }`}
                                key={notification._id}
                              >
                                <strong>
                                  {notification.message && notification.message}
                                </strong>{" "}
                                {notification.createdAt && (
                                  <ReactTimeAgoC
                                    date={new Date(notification.createdAt)}
                                  />
                                )}
                              </Dropdown.Item>
                            );
                          } else {
                            return (
                              <Dropdown.Item
                                as={Link}
                                to={redirectionLink}
                                // onClick={() => history.push(`${redirectionLink}`)}
                                className={`text-normal ${
                                  !notification.isRead && "unreadNotification"
                                }`}
                                key={notification._id}
                              >
                                <strong>
                                  {notification.message && notification.message}
                                </strong>{" "}
                                {notification.createdAt && (
                                  <ReactTimeAgoC
                                    date={new Date(notification.createdAt)}
                                  />
                                )}
                              </Dropdown.Item>
                            );
                          }
                        })
                      ) : (
                        <div className="text-center p3 color_gray ">
                          No notification present
                        </div>
                      )}
                    </DropdownButton>
                    <button
                      type="button"
                      onClick={redirectToAccount}
                      className="re_walletBtn"
                    >
                      <img src={wallet} alt="wallet" />
                    </button>
                  </>
                )}
              </Nav>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                ref={collapse}
                onClick={() => setNavExpanded(navExpanded ? false : "expanded")}
              />
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
};
export default Header;
