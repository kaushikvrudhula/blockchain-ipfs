import React, { useEffect, useRef, useState } from 'react';
import { Button, Fade, OverlayTrigger, Popover } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Transition } from 'react-transition-group';
import { useAuth } from '../../Context/AuthContext';
import logo from '../../img/logo.png';
import menu from '../Resources/img/menu.png';
import userLogo from '../Resources/img/user-logo.svg';

const Navbar = (props) => {
  const [error, setError] = useState('');
  const { currentUser, logout, printUsers } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const duration = 500;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 0.5 },
    entered: { opacity: 1 },
    exiting: { opacity: 0.5 },
    exited: { opacity: 0 },
  };

  const Fade = ({ in: inProp }) => (
    <Transition in={inProp} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          This is Fade Transition sample code!
        </div>
      )}
    </Transition>
  );
  const setStyle = () => {
    setOpen(!open);
  };

  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  const connectWalletHandler = async () => {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }

    // Load accounts
    const accounts = await props.web3.eth.getAccounts();
    props.setAccount(accounts[0]);
  };

  let etherscanUrl;

  if (props.networkId === 3) {
    etherscanUrl = 'https://ropsten.etherscan.io';
  } else if (props.networkId === 4) {
    etherscanUrl = 'https://rinkeby.etherscan.io';
  } else if (props.networkId === 5) {
    etherscanUrl = 'https://goerli.etherscan.io';
  } else {
    etherscanUrl = 'https://etherscan.io';
  }

  return (
    <nav className="navbar navbar-dark bg-secondary p-0">
      <a className="navbar-brand" href="/dashboard">
        <img
          src={logo}
          width="40"
          height="40"
          className="align-center"
          alt="logo"
        />
        Secure Transfer
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item">
          {!props.account && (
            <button
              type="button"
              className="btn btn-outline-light custom"
              onClick={connectWalletHandler}
            >
              Connect your wallet
            </button>
          )}
        </li>
      </ul>
      <ul className="navbar-nav px-3">
        <li className="nav-item">
          <div class="text-center w-100 text-dark">
            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              overlay={
                <Popover id={'popover-positioned-bottom'}>
                  <div className="profile">
                    <div className="profile-userpic">
                      <img src={userLogo} className="img-responsive" alt="" />
                    </div>
                    <div class="profile-usertitle">
                      <div className="profile-usertitle-name">
                        {props.user.email}
                      </div>
                      <div className="profile-usertitle-job">
                        {props.user.role}
                      </div>
                    </div>
                    <div className="profile-userbuttons">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </Popover>
              }
            >
              <button
                className={`menu ${open ? 'opened' : ''}`}
                onClick={setStyle}
                aria-label="Main Menu"
              >
                <svg width="50" height="50" viewBox="0 0 100 100">
                  <path
                    className="line line1"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  />
                  <path className="line line2" d="M 20,50 H 80" />
                  <path
                    className="line line3"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  />
                </svg>
              </button>
            </OverlayTrigger>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
