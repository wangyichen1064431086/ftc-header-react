import React from 'react';

class LoginOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      saveme:'1'
    }
    /*
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSavemeChange = this.handleSavemeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    */
  }
  /*
  handleUsernameChange(e) {
    this.setState({
      username:e.target.value
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password:e.target.value
    });
  }
  handleSavemeChange(e) {
    this.setState((prevState) => ({
      saveme:!prevState.saveme
    }));
  }
  */
  handleChange(fieldname, e) {
    switch(fieldname) {
      case 'username':
      case 'password':
        const {value} = e.target;
        this.setState({
          [fieldname]:value
        });
        break;
      case 'saveme':
        const {checked} = e.target;
        let newSavemeValue;
        if(checked) {
          newSavemeValue = '1';
        } else {
          newSavemeValue = '0';
        }
        this.setState({
          saveme:newSavemeValue
        });
        break;
      default:
        console.log('Have not dealed with this field');
    }
  }
  render () {
    const show = this.props.show;
    let displayClass;
    if (show) {
      displayClass = "ftc-header__loginoverlay ftc-header__loginoverlay--show";
    } else {
      displayClass = "ftc-header__loginoverlay";
    }
    const {username, password, saveme} = this.state;
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
              <input type="text" name="username" id="ftcLoginUsername" value={username} onChange = {this.handleChange.bind(this, 'username')} />
            </div>

            <div className="ftc-header__loginoverlay-item">
              <label htmlFor="ftcLoginPassword">
                密码
              </label>
              <input type="password" className="ftc-header__loginoverlay-oneline" name="password" id="ftcLoginPassword" value={password} onChange = {this.handleChange.bind(this,'password')} />
            </div>
          
            <div className="ftc-header__loginoverlay-saveandsub">
              <input className="ftc-header__loginoverlay-saveme" type="checkbox" value={saveme} checked={saveme==='1'} name="saveme" id="ftcLoginSaveme" onChange={this.handleChange.bind(this,'saveme')}/>
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