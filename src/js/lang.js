import React from 'react';

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

export default Lang;