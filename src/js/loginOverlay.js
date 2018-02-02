import React from 'react';

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

export default LoginOverlay;