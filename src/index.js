import React from 'react';
import ReactDOM from 'react-dom';
//import './css/simpleHeader.css';
import './css/fullHeader.css';

import {getCookie} from './js/helpers.js';

import Sign from './js/sign.js';
import LoginOverlay from './js/loginOverlay';

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
*/
class Lang extends React.Component {

  render() {
    const langs = this.props.lang.list;
    
    const listItems = langs.map((lang, index) => {
      const handleClick = index === 0 ? this.props.clickDefault : null;
      return (
      <li className = "ftc-header__lang-item" key={index} onClick={handleClick}>
        <a href={lang.url}>
          {lang.name}
        </a>
      </li>
    )});
    const ulClass = this.props.showAll ? "ftc-header__lang-list" : "ftc-header__lang-list ftc-header__lang-listdefault";
    return (
      <div className="ftc-header__lang">
        <ul className={ulClass}>
          {listItems}
        </ul>
      </div>
    )
  }
}

class Hamburg extends React.Component {
  render() {
    return (
      <div className="ftc-header__hamburg">
      </div>
    )
  }
}

class Nav extends React.Component {
  render() {
    const nav = this.props.navData;
    const topChannels = nav.topChannels;
    let subChannels = [];

    const topChannelItems = topChannels.map((topChannel, i) => {

      const topChannelItemClass = topChannel.index === nav.indexForSelectedTopChannel ? "ftc-header__nav-item ftc-header__nav-topitem ftc-header__nav-topitem-selected" : "ftc-header__nav-item ftc-header__nav-topitem";
      const pushdownSubChannels = topChannel.subChannels;
     
      let pushdownSubChannelItems;
      if (pushdownSubChannels && pushdownSubChannels.length>0) {
        pushdownSubChannelItems = pushdownSubChannels.map((subChannel, i) => {
          return (
            <li className="ftc-header__nav-pushdownitem" key={subChannel.index}>
              <a href={subChannel.url}>
                {subChannel.name}
              </a>
            </li>
          )
        });
      }
      if (topChannel.index === nav.indexForSelectedTopChannel) {
        subChannels = topChannel.subChannels;//subChannels存储被选中的topChannel对应的subChannels数据
      }
      return (
        <li className={topChannelItemClass} key={topChannel.index}>
          <a href={topChannel.url}>
            {topChannel.name}
          </a>
          { (pushdownSubChannels && pushdownSubChannels.length>0) &&
          <ul className="ftc-header__nav-pushdownlist">
            {pushdownSubChannelItems}
          </ul>
          }
        </li>
      );
    });
    
    const subChannelItems = subChannels.map((subChannel, i) => {
      const subChannelItemClass = subChannel.index === nav.indexForSelectedSubChannel ? "ftc-header__nav-item ftc-header__nav-subitem ftc-header__nav-subitem-selected" : "ftc-header__nav-item ftc-header__nav-subitem";
      return (
        <li className={subChannelItemClass} key={subChannel.index}>
          <a href={subChannel.url}>
            {subChannel.name}
          </a>
        </li>
      );
    });
    return (
      <nav className="ftc-header__nav" role="navigation" aria-label="Main navigation">
        <ul className="ftc-header__nav-list ftc-header__nav-toplist" data-ftc--sticky>
          {topChannelItems}
        </ul>
        <ul className="ftc-header__nav-list ftc-header__nav-sublist">
          {subChannelItems}
        </ul>
      </nav>

    )
  }
}

class Search extends React.Component {
  render() {
    return (
      <div className="ftc-header__search ftc-header__search-default  ftc-header__row" >
      </div>
    )
  }
}

class FtcFullHeader extends React.Component {
  constructor(props) {
    super(props);
    const userName = getCookie('username');
    this.state = {
      hasSignIn: userName ? true: false , //表征是否已登录，默认为false
      showLoginOverlay: false,
      showAllLangs:false
    }

    this.clickSignIn = this.clickSignIn.bind(this);
    this.clickToClose = this.clickToClose.bind(this);
    this.clickDefaultLang = this.clickDefaultLang.bind(this);
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
  clickDefaultLang() {
    this.setState({
      showAllLangs: !this.state.showAllLangs
    });
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
              <Hamburg />
            </div>

            <div className="ftc-header__top-column ftc-header__top-right">
              <Sign signData = {data.sign} hasSignIn = {this.state.hasSignIn} clickSignIn = {this.clickSignIn}/>
            </div>
          </div>
        </div>

        <Nav navData = {data.nav} />
        <Search />
        <LoginOverlay />
      </header>
    )
  }
}


ReactDOM.render(
  //<FtcSimpleHeader headerData = {dataForSimpleHeader} />,
  <FtcFullHeader />,
  document.getElementById('root')
)