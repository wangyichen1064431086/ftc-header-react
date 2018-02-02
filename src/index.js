import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {getCookie} from './js/helpers.js';

import Sign from './js/sign.js';
import LoginOverlay from './js/loginOverlay';

import dataForSimpleHeader from './js/data/dataForSimpleHeader';
import dataForFullHeader from './js/data/dataForFullHeader';

class FtcSimpleHeader extends React.Component {
  constructor(props) {
    super(props);
    const userName = getCookie('username');
    this.state = {
      hasSignIn: userName ? true: false , //表征是否已登录，默认为false
      showLoginOverlay: false
    }
    this.clickSignIn = this.clickSignIn.bind(this);
    this.clickToClose = this.clickToClose.bind(this);
  }
  clickSignIn(e) {
    e.preventDefault();
    this.setState({
      showLoginOverlay:!this.state.showLoginOverlay //点一下show，再点一下hide
    })
  }
  clickToClose() {
    this.setState({
      showLoginOverlay:false
    })
  }
  render() {
    const data = this.props.headerData;
    let titleClass;
    if (data.myTitle) {
      titleClass = "ftc-header__top-column ftc-header__top-center ftc-header-tagtitle"; 
    } else {
      titleClass = "ftc-header__top-column ftc-header__top-center ftc-header-hometitle";
    }
    return (
      <header className="ftc-header">
        <div className="ftc-header__top ">
          <div className = "ftc-header__container">
            <div className={titleClass}>
              {data.myTitle}
            </div>

            <div className="ftc-header__top-column ftc-header__top-right">
              <Sign signData = {data.sign} hasSignIn = {this.state.hasSignIn} clickSignIn = {this.clickSignIn}/>
            </div>
          </div>
        </div>

        <LoginOverlay show = {this.state.showLoginOverlay} clickToClose ={this.clickToClose}/>
      </header>
    );
  }
}


class Lang extends React.Component {
  
}

class Hamburg extends React.Component {

}

class Nav extends React.Component {

}

class Search extends React.Component {

}
class FtcFullHeader extends React.Component {
  render() {
    const data = dataForFullHeader;
    let isHome;
    if (data.nav.indexForSelectedTopChannel == 0 && data.nav.indexForSelectedSubChannel < 0) {
      isHome = true;
    } else {
      isHome = false;
    }
    let titleClass;
    if (isHome) {
      titleClass = "ftc-header__top-column ftc-header__top-center ftc-header-hometitle";
    } else {
      titleClass = "ftc-header__top-column ftc-header__top-center ftc-header-tagtitle"
    }
    return (
      
      <header className="ftc-header">
        <div className="ftc-header__top ">
		      <div className="ftc-header__container">

            <div className = {titleClass}>
              { !isHome ? data.myTitle : '' }
            </div>

            <div className="ftc-header__top-column ftc-header__top-left">
              { isHome ? 
                <Lang /> :
                (<div className="ftc-header__brand">
                </div>
                ) 
              }
              <Hamburg />
            </div>

            <div class="ftc-header__top-column ftc-header__top-right">
              <Sign />
            </div>
          </div>
        </div>

        <Nav />
        <Search />
        <LoginOverlay />
      </header>
    )
  }
}


ReactDOM.render(
  <FtcSimpleHeader headerData = {dataForSimpleHeader} />,
  document.getElementById('root')
)