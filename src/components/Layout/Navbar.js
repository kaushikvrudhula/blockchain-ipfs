import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useAuth } from '../../Context/AuthContext';
import logo from '../../img/logo.png';

const Navbar = (props) => {
  const [error, setError] = useState('');
  const { currentUser, logout, printUsers } = useAuth();
  const navigate = useNavigate();
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
    <nav className="navbar navbar-dark bg-primary p-0">
      <a className="navbar-brand" href="/#">
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
          {props.account && (
            <a
              className="nav-link small"
              href={`${etherscanUrl}/address/${props.account}`}
              target="blank"
              rel="noopener noreferrer"
            >
              {props.account}
            </a>
          )}
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
          <div class="mt-2 text-center w-100 text-dark">
            <Button variant="light" onClick={handleLogout} className="slide">
              <b class="text-dark">Log Out</b>
            </Button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
