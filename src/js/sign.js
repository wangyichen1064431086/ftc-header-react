import React from 'react';

class Sign extends React.Component {

  render() {
    const {signData,hasSigned,clickSignIn} = this.props;//es6的拆分对象(具体名词叫什么，忘记了。。)
    //const data = this.props.signData;
    //const hasSigned = this.props.hasSignIn;
    const data = signData;
    console.log(data);
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
          <a className="ftc-header__sign-signin" href={data.signIn.url} onClick={(e) => clickSignIn(e)}>
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

export default Sign;