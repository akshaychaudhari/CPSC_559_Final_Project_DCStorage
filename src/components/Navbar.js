import React, { Component } from 'react';
import Identicon from 'identicon.js';
import cryptoBox from "../assets/logos/tLogo.png";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import Direct from "./Direct";

class Navbar extends Component {

  render() {
    return (
      <nav style={{fontFamily: "Cursive"}} className="navbar navbar-light bg-light p-0 shadow bg-body rounded">
          <img src={cryptoBox} width="150" height="70" className="align-top ml-3 pt-1 pb-2" alt="CryptoBox App Logo" />
          <a style={{color: "#5c13ec", fontSize: "18px"}} class="nav-link" aria-current="page" href="#"> <span className='fa fa-globe' style={{fontSize: "20px"}}></span> Global </a>
          <a style={{color: "#5c13ec", fontSize: "18px"}} class="nav-link" aria-current="page" href="/direct"> <span className='fa fa-share' style={{fontSize: "20px"}}></span> Direct </a>
          <a style={{color: "#5c13ec", fontSize: "18px"}} class="nav-link" aria-current="page" href="#"> <span className='fa fa-users' style={{fontSize: "17px"}}></span> Organization</a>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search File:" aria-label="Search" />
            <button style={{backgroundColor: "#5c13ec", color: "white"}} class="btn" type="submit">Search</button>
          </form>
        <ul className="navbar-nav px-3">
          <li>
            <small id="account">
              <a target="_blank"
                 alt=""
                 style={{color: "black"}}
                 rel="noopener noreferrer"
                 href={"https://etherscan.io/address/" + this.props.account}>
                {this.props.account ? this.props.account.substring(0,6) : "0x0"}...{this.props.account ? this.props.account.substring(38,42) : "0x0"}
              </a>
            </small>
            { this.props.account
              ? <img
                  alt=""
                  className='ml-2'
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;