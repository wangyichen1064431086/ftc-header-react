import React from 'react';
import ReactDOM from 'react-dom';
//import './css/simpleHeader.css';
import './css/fullHeader.css';

import {getCookie, getOffsetTop, getScrollTop, getViewportWidth} from './js/helpers.js';

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
    const viewportWidth = getViewportWidth();
    this.isMobile = viewportWidth <= 980;
    const data = dataForFullHeader;
    const indexForSelectedTopChannel = data.nav.indexForSelectedTopChannel;//初始值
    const indexForSelectedSubChannel = data.nav.indexForSelectedSubChannel;//初始值
    const isHome = indexForSelectedTopChannel === 0 && indexForSelectedSubChannel < 0;
    const myTitle = data.myTitle || '';
    this.state = {
      hasSignIn: userName ? true: false , //表征是否已登录，默认为false
      showLoginOverlay: false,
      showAllLangs:false,
      showMobileNav: false,
      showSearchForm:false,

      stickyNavTop:false,
      stickySearch: false,

      indexForSelectedTopChannel: indexForSelectedTopChannel,
      indexForSelectedSubChannel: indexForSelectedSubChannel,
      isHome: isHome,
      titleText: isHome ? '':myTitle,
      titleClass: isHome ? "ftc-header-hometitle":"ftc-header-tagtitle"
    }
  
    //this.clickSignIn = this.clickSignIn.bind(this);
    this.clickToClose = this.clickToClose.bind(this);
    this.clickDefaultLang = this.clickDefaultLang.bind(this);
    this.clickHamburg = this.clickHamburg.bind(this);
    this.clickSearchSwitch = this.clickSearchSwitch.bind(this);

    this.clickTopChannel = this.clickTopChannel.bind(this);

    this.stickyWhenScroll = this.stickyWhenScroll.bind(this);
  }

  componentDidMount() {
    const navTop = this.refs.nav.refs.topnav;//为什么这里就不需要findDOMNode? NOTE：findDOMNode(ReactComponent component) 是返回该React组件实例——component相应的DOM节点。而此处因为该React组件就是DOM元素，所以直接取React组件就行。
    this.navTopOffsetTop = getOffsetTop(navTop);

    const search = ReactDOM.findDOMNode(this.refs.search);//NOTE:this.refs.search是一个对象，而调用ReactDOM.findDOMNode之后才能得到node
    this.searchOffsetTop = getOffsetTop(search);

    window.addEventListener('scroll', this.stickyWhenScroll);



  }
  
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.stickyWhenScroll);//在React中使用原生DOM事件时，一定要在组件卸载时手动移除,否则可能发生内存泄漏。
  }

  stickyWhenScroll() {
    const scrollTopNow = getScrollTop();
    this.setState((prevState) => ({
      stickyNavTop: scrollTopNow > this.navTopOffsetTop,
      stickySearch: scrollTopNow > this.searchOffsetTop
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

  getNavData(data) {
   
    const navData = data.nav;

    const channelArr = data.nav.topChannels;
    const channelArrForMobile = [];
    for (const item of channelArr) {
 
      const newItem = Object.assign({},item,{url:"",subChannels:[]});
      if (item.subChannels && item.subChannels.length > 0) {
        const newSubChannels = item.subChannels.slice();
        const subChannelForHome = {
          name: item.name === "首页" ? "FT中文网首页":"频道首页",
          url: item.url,
          index: 100
        }
        newSubChannels.unshift(subChannelForHome);
        newItem.subChannels = newSubChannels;
      }
      channelArrForMobile.push(newItem);
    }
    const navDataForMobile = Object.assign({},navData,{topChannels:channelArrForMobile});

    return this.isMobile ? navDataForMobile : navData;//当isMobile为true的时候，nav的数据要进行改变

  }

  clickTopChannel(e) {
    if (!this.isMobile) { //只有mobile的nav需要处理
      return;
    }
    
    if (e.target.tagName !== 'A') {
      return;
    }
    
    e.preventDefault();
    const toSelectElem = e.target.parentNode;//li的key才是有用的
   
    const dataindex = Number(toSelectElem.getAttribute("dataindex"));//这里直接取toSelectElem.dataindex取不到属性。。。待查
    const newTitle = toSelectElem.getAttribute("dataname");
    const isHome = dataindex === 0;
    this.setState({
      isHome: isHome,
      indexForSelectedTopChannel: dataindex,//这里不能使用key的原因为： Keys可以作为React的提示，但不会传递给组件。如果您的组件还需要用到和key相同的值，那么请将其明确地以其他名称属性（如id）进行传递：
      titleText:newTitle,
      titleClass: isHome ? "ftc-header-hometitle":"ftc-header-tagtitle"
    });
  }

  render() {
    const data = dataForFullHeader;
    const navData = this.getNavData(data);
    
    return (
      
      <header className="ftc-header">
        <div className="ftc-header__top ">
		      <div className="ftc-header__container">

            <div className = {`ftc-header__top-column ftc-header__top-center ${this.state.titleClass}`}>
              {/*{ !isHome ? data.myTitle : '' }*/}
              {this.state.titleText}
            </div>
   
            <div className="ftc-header__top-column ftc-header__top-left">
              { this.state.isHome ? 
                <Lang lang={data.lang} showAll={this.state.showAllLangs} clickDefault={this.clickDefaultLang}/> :
                (<div className="ftc-header__brand">
                </div>
                ) 
              }
              <Hamburg clickHamburg={this.clickHamburg} />
            </div>

            <div className="ftc-header__top-column ftc-header__top-right">
              <Sign signData = {data.sign} hasSignIn = {this.state.hasSignIn} clickSignIn = {(e)=>this.clickSignIn(e)}/> 
              {/*使用箭头函数绑定事件，不用再bind了
              这里clickSignIn = {(e)=>this.clickSignIn(e)}等价于：
              clickSignIn = {this.clickSignIn.bind(this)}
              */}
            </div>
          </div>
        </div>

        <Nav ref="nav" navData = {navData} isMobile={this.isMobile} showMobileNav = {this.state.showMobileNav} sticky={this.state.stickyNavTop} indexForSelectedTopChannel ={this.state.indexForSelectedTopChannel} indexForSelectedSubChannel = {this.state.indexForSelectedSubChannel} clickTopChannel = {this.clickTopChannel}/>

        <Search ref="search" searchData = {data.search} showSearchForm = {this.state.showSearchForm} clickSearchSwitch = {this.clickSearchSwitch} sticky={this.state.stickySearch}/>

        <LoginOverlay show = {this.state.showLoginOverlay} clickToClose ={this.clickToClose}/>

        {/*<div dangerouslySetInnerHTML={{__html:'cc &copy; 2015'}} />*/}
      </header>
    )
  }
}


ReactDOM.render(
  //<FtcSimpleHeader headerData = {dataForSimpleHeader} />,
  <FtcFullHeader />,
  document.getElementById('root')
)