import React from 'react';

class Search extends React.Component {
  render() {
    const data = this.props.searchData;
    const searchClass = this.props.showSearchForm ? "ftc-header__search ftc-header__row" : "ftc-header__search ftc-header__search-default  ftc-header__row";
    return (
      <div className={searchClass} >
        <div className="ftc-header__container">
          <form className="ftc-header__search-formregion" action={data.actionUrl}>
            <button className="ftc-header__search-searchbtn"></button>
            <div className="ftc-header__search-inputarea">
              <input className="ftc-header__search-input" type="search" placeholder={data.placeholderText} />
            </div>
          </form>
          <div className="ftc-header__search-switch" onClick={this.props.clickSearchSwitch}>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;