import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Sign extends React.Component {

  render() {
    const data = this.props.signData;
    const hasSigned = this.props.hasSignIn;
    let signMenu
    if (hasSigned) {
      signMenu = (
        <div className="ftc-header__sign-readermenu ftc-header__sign-memebermenu ">
          <a href={data.myFT.url}>
            {data.myFT.word}
          </a>
          <a href={data.mySet.url}>
            {data.mySet.word}
          </a>
          <a href={data.signOut.url}>
            {data.signOut.word}
          </a>
        </div>
      );
    } else {
      signMenu = (
        <div className="ftc-header__sign-readermenu ftc-header__sign-visitormenu">
          <a className="ftc-header__sign-signin" href={data.signIn.url} onClick={(e) => this.props.clickSignIn(e)}>
            {data.signIn.word}
          </a>
          <a href={data.signUp.url}>
             {data.signUp.word}
          </a>
        </div>
      );
    }
    return (
      <div>
        {signMenu}
      </div>
    )
  }

}

class LoginOverlay extends React.Component {
 
  render () {
    const show = this.props.show;
    let displayClass;
    if (show) {
      displayClass = "ftc-header__loginoverlay ftc-header__loginoverlay--show";
    } else {
      displayClass = "ftc-header__loginoverlay";
    }
    return (
      <div className={displayClass} >
        <div className="ftc-header__loginoverlay-window">

          <div className="ftc-header__loginoverlay-title">
            登录
            <span className="ftc-header__loginoverlay-close" onClick={ this.props.clickToClose}>×</span>
          </div>

          <form method="post" className="ftc-header__loginoverlay-form" action="/users/login">
            <div className="ftc-header__loginoverlay-item ftc-header__loginoverlay-username">
              <label htmlFor="ftcLoginUsername">
                  电子邮件/用户名
              </label>
              <input type="text" name="username" id="ftcLoginUsername" />
            </div>

            <div className="ftc-header__loginoverlay-item">
              <label htmlFor="ftcLoginPassword">
                密码
              </label>
              <input type="password" className="ftc-header__loginoverlay-oneline" name="password" id="ftcLoginPassword" />
            </div>
          
            <div className="ftc-header__loginoverlay-saveandsub">
              <input className="ftc-header__loginoverlay-saveme" type="checkbox" value="1" defaultChecked="checked" name="saveme" id="ftcLoginSaveme" />
              <label htmlFor="ftcLoginSaveme">记住我</label>

              <input className="ftc-header__loginoverlay-submit" type="submit" value="提交" />
            </div>
          </form>
          
          <div className="ftc-header__loginoverlay-bottom">
            <div className="ftc-header__loginoverlay-bottomline">
              <a href="/users/findpassword">
                找回密码
              </a>
            </div>
            <div className="ftc-header__loginoverlay-bottomline">
              <a href="http://user.ftchinese.com/register">
                免费注册
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

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

const dataForSimpleHeader = {	
  "myTitle":"",
	"sign":{
    "signIn":{
      "url":"http://user.ftchinese.com/login",
      "word":"登录"
    },
    "signUp":{
      "url":"http://user.ftchinese.com/register",
      "word":"免费注册"
    },
    "myFT":{
      "url":"http://www.ftchinese.com/users/mystories",
      "word":"我的FT"
    },
    "mySet":{
      "url":"http://www.ftchinese.com/users/cp",
      "word":"设置"
    },
    "signOut":{
      "url":"http://user.ftchinese.com/logout",
      "word":"登出"
    }
  }
};

function getCookie(name) { 
  var start = document.cookie.indexOf(name+'='),
      len = start+name.length+1,
      end = document.cookie.indexOf(';',len);
  if ((!start) && (name !== document.cookie.substring(0,name.length))) {return null;}
  if (start === -1) {return null;}
  if (end === -1) {end = document.cookie.length; }
  return decodeURIComponent(document.cookie.substring(len,end));
}

ReactDOM.render(
  <FtcSimpleHeader headerData = {dataForSimpleHeader} />,
  document.getElementById('root')
)