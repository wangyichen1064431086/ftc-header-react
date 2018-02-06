import React from 'react';
import ReactDOM from 'react-dom';
//import './css/simpleHeader.css';
import './css/fullHeader.css';

import {getCookie, getOffsetTop, getScrollTop} from './js/helpers.js';

import Sign from './js/sign.js';
import LoginOverlay from './js/loginOverlay';
import Lang from './js/lang';
import Hamburg from './js/hamburg';
import Search from './js/search';
import Nav from './js/nav';

//import dataForSimpleHeader from './js/data/dataForSimpleHeader';
import dataForFullHeader from './js/data/dataForFullHeader';

/*
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
    this.setState((prevState) => ({
      showLoginOverlay:!prevState.showLoginOverlay //点一下show，再点一下hide
    }));
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
*/





class FtcFullHeader extends React.Component {
  constructor(props) {
    super(props);
    const userName = getCookie('username');
    
    this.state = {
      hasSignIn: userName ? true: false , //表征是否已登录，默认为false
      showLoginOverlay: false,
      showAllLangs:false,
      showMobileNav: false,
      showSearchForm:false,
      scrollTopNow: 0,
      stickyNavTop:false
    }

    this.clickSignIn = this.clickSignIn.bind(this);
    this.clickToClose = this.clickToClose.bind(this);
    this.clickDefaultLang = this.clickDefaultLang.bind(this);
    this.clickHamburg = this.clickHamburg.bind(this);
    this.clickSearchSwitch = this.clickSearchSwitch.bind(this);

    this.stickyWhenScroll = this.stickyWhenScroll.bind(this);
  }

  componentDidMount() {
    const navTop = this.refs.nav.refs.topnav;//为什么这里就不需要findDOMNode?
    this.navTopOffsetTop = getOffsetTop(navTop);

    const search = ReactDOM.findDOMNode(this.refs.search);//NOTE:this.refs.search是一个对象，而调用ReactDOM.findDOMNode之后才能得到node
    this.searchOffsetTop = getOffsetTop(search);

    window.addEventListener('scroll', this.stickyWhenScroll);

  }
  
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.stickyWhenScroll);
  }

  stickyWhenScroll() {
    this.setState((prevState) => ({
      scrollTopNow: getScrollTop(),
      stickyNavTop: prevState.scrollTopNow > this.navTopOffsetTop,
      stickySearch: prevState.scrollTopNow > this.searchOffsetTop
    }));
  }
 

  clickSignIn(e) {
    e.preventDefault();
    console.log(this.state);//*a
    this.setState((prevState) => ({
      showLoginOverlay: !prevState.showLoginOverlay //点一下show，再点一下hide
    }));
    console.log(this.state);//*b: *b相对*a并没有发生结果的改变，这里也可以说明state的更新是异步的
  }
  clickToClose() {
    this.setState({
      showLoginOverlay:false
    });
  }
  clickDefaultLang() {
    this.setState((prevState) => ({
      showAllLangs: !prevState.showAllLangs
    }));
  }
  clickHamburg() {
    this.setState((prevState) => ({
      showMobileNav: !prevState.showMobileNav
    }));
  }
  clickSearchSwitch() {
    this.setState((prevState) => ({
      showSearchForm: !prevState.showSearchForm
    }));
  }
  
  render() {
    const data = dataForFullHeader;
    let isHome;
    if (data.nav.indexForSelectedTopChannel === 0 && data.nav.indexForSelectedSubChannel < 0) {
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
      // todo:根据nav一级二级值，计算tagTitle的值:{ !isHome ? data.myTitle : tagTitle }
      <header className="ftc-header">
        <div className="ftc-header__top ">
		      <div className="ftc-header__container">

            <div className = {titleClass}>
              { !isHome ? data.myTitle : '' }
            </div>

            <div className="ftc-header__top-column ftc-header__top-left">
              { isHome ? 
                <Lang lang={data.lang} showAll={this.state.showAllLangs} clickDefault={this.clickDefaultLang}/> :
                (<div className="ftc-header__brand">
                </div>
                ) 
              }
              <Hamburg clickHamburg={this.clickHamburg} />
            </div>

            <div className="ftc-header__top-column ftc-header__top-right">
              <Sign signData = {data.sign} hasSignIn = {this.state.hasSignIn} clickSignIn = {this.clickSignIn}/>
            </div>
          </div>
        </div>

        <Nav ref="nav" navData = {data.nav} showMobileNav = {this.state.showMobileNav} sticky={this.state.stickyNavTop} />
        <Search ref="search" searchData = {data.search} showSearchForm = {this.state.showSearchForm} clickSearchSwitch = {this.clickSearchSwitch} sticky={this.state.stickySearch}/>
        <LoginOverlay show = {this.state.showLoginOverlay} clickToClose ={this.clickToClose}/>
      </header>
    )
  }
}


ReactDOM.render(
  //<FtcSimpleHeader headerData = {dataForSimpleHeader} />,
  <FtcFullHeader />,
  document.getElementById('root')
)